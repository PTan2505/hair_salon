package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Model.BookingResponse;
import com.example.Hair_Salon_Project.Entity.*;
import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Exception.ValidationException;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.BookingRepository;
import com.example.Hair_Salon_Project.Repository.ProductRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import com.example.Hair_Salon_Project.Repository.TimeSlotRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private ModelMapper modelMapper;

    public BookingResponse createBooking(BookingRequest bookingRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Account not found with email: " + email));

        Product product = productRepository.findById(bookingRequest.getProductId())
                .orElseThrow(
                        () -> new NotFoundException("Product not found with id: " + bookingRequest.getProductId()));

        ProductClone clonedProduct = productService.cloneProduct(product);

        int numberOfRequiredTimeSlots = (int) Math.ceil(product.getTime() / 30.0);

        ArrayList<TimeSlot> timeSlots = getRequiredTimeSlots(bookingRequest.getTimeSlotId(), numberOfRequiredTimeSlots);

        // Validate the booking time
        if (LocalDateTime.now().isAfter(bookingRequest.getBookingDate().atStartOfDay())) {
            throw new ValidationException("Cannot create booking in the past.");
        }

        if (LocalDate.now().isEqual(bookingRequest.getBookingDate())) {
            LocalTime earliestStartTime = timeSlots.get(0).getStartTime();
            LocalDateTime earliestStartDateTime = LocalDateTime.of(bookingRequest.getBookingDate(), earliestStartTime);
            if (LocalDateTime.now().isAfter(earliestStartDateTime)) {
                throw new ValidationException("Cannot create booking because the time slot has already passed.");
            }
        }

        Staff staff;
        if (bookingRequest.getStaffId() != null) {
            staff = staffRepository.findById(bookingRequest.getStaffId())
                    .orElseThrow(
                            () -> new NotFoundException("Staff not found with id: " + bookingRequest.getStaffId()));
            if (!isStaffAvailable(staff, timeSlots, bookingRequest.getBookingDate())) {
                throw new ValidationException("Selected staff is not available for the chosen time slot.");
            }
        } else {
            staff = findLeastBusyStaff(timeSlots, bookingRequest.getBookingDate());
        }

        Booking booking = modelMapper.map(bookingRequest, Booking.class);
        booking.setAccount(account);
        booking.setStaff(staff);
        booking.setProduct(clonedProduct);
        booking.setTimeSlots(timeSlots);

        Booking savedBooking = bookingRepository.save(booking);
        return modelMapper.map(savedBooking, BookingResponse.class);
    }

    private ArrayList<TimeSlot> getRequiredTimeSlots(Long timeSlotId, int numberOfRequiredTimeSlots) {
        ArrayList<TimeSlot> availableSlots = new ArrayList<>();

        for (int i = 0; i < numberOfRequiredTimeSlots; i++) {
            Long tmpTimeSlotId = timeSlotId + i;
            TimeSlot timeSlot = timeSlotRepository.findById(tmpTimeSlotId)
                    .orElseThrow(() -> new NotFoundException("TimeSlot not found with id: " + (tmpTimeSlotId)));
            availableSlots.add(timeSlot);
        }

        return availableSlots;
    }

    private boolean isTimeSlotBooked(TimeSlot timeSlot, LocalDate bookingDate, Staff staff) {
        return bookingRepository.existsByTimeSlotsAndBookingDateAndStaffAndStatusNot(timeSlot, bookingDate, staff,
                BookingStatus.CANCELLED);
    }

    private boolean isStaffAvailable(Staff staff, ArrayList<TimeSlot> timeSlots, LocalDate bookingDate) {
        for (TimeSlot timeSlot : timeSlots) {
            if (isTimeSlotBooked(timeSlot, bookingDate, staff)) {
                return false;
            }
        }
        return true;
    }

    private Staff findLeastBusyStaff(ArrayList<TimeSlot> timeSlots, LocalDate bookingDate) {
        return staffRepository.findAll().stream()
                .filter(staff -> isStaffAvailable(staff, timeSlots, bookingDate))
                .min((s1, s2) -> Integer.compare(countBookings(s1, bookingDate), countBookings(s2, bookingDate)))
                .orElseThrow(() -> new ValidationException("No available staff members for the selected time slots."));
    }

    private int countBookings(Staff staff, LocalDate bookingDate) {
        return bookingRepository.countByStaffAndBookingDateAndStatusNot(staff, bookingDate, BookingStatus.CANCELLED);
    }

    public ArrayList<BookingResponse> getListBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Account not found with email: " + email));

        // Retrieve all bookings associated with the logged account
        ArrayList<Booking> bookings = bookingRepository.findByAccount(account);
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingResponse.class))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public BookingResponse getBookingDetails(Long bookingId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Account not found with email: " + email));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found with id: " + bookingId));

        if (booking.getAccount().getId() != account.getId()) {
            throw new ValidationException("This booking does not belong to the logged-in account.");
        }

        return modelMapper.map(booking, BookingResponse.class);
    }

    public boolean cancelBooking(Long id) {
        Optional<Booking> existingBookingOpt = bookingRepository.findById(id);
        if (existingBookingOpt.isPresent()) {
            Booking booking = existingBookingOpt.get();
            booking.setStatus(BookingStatus.CANCELLED);
            bookingRepository.save(booking);
            return true;
        }
        throw new NotFoundException("Booking not found");
    }

}