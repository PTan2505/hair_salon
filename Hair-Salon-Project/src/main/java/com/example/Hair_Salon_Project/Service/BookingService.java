package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Model.BookingRequest;
import com.example.Hair_Salon_Project.Model.BookingResponse;
import com.example.Hair_Salon_Project.Model.BookingStatusRequest;
import com.example.Hair_Salon_Project.Model.ProductCloneResponse;
import com.example.Hair_Salon_Project.Entity.*;
import com.example.Hair_Salon_Project.Entity.Enums.BookingStatus;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Exception.ValidationException;
import com.example.Hair_Salon_Project.Repository.BookingRepository;
import com.example.Hair_Salon_Project.Repository.ProductRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import com.example.Hair_Salon_Project.Repository.TimeSlotRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    private StaffRepository staffRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ModelMapper modelMapper;

    public Booking createBooking(BookingRequest bookingRequest) {
        Account account = authenticationService.getCurrentAccount();

        Product product = productRepository.findById(bookingRequest.getProductId())
                .orElseThrow(
                        () -> new NotFoundException("Product not found with id: " + bookingRequest.getProductId()));

        ProductClone clonedProduct = productService.cloneProduct(product);

        int numberOfRequiredTimeSlots = (int) Math.ceil(product.getTime() / 30.0);

        List<TimeSlot> timeSlots = getRequiredTimeSlots(bookingRequest.getTimeSlotId(), numberOfRequiredTimeSlots);

        // Validate the booking time

        if (LocalDate.now().isAfter(bookingRequest.getBookingDate())) {
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

            if (staff.getRole() != Role.STYLIST) {
                throw new ValidationException("Only stylist can receive booking.");
            }

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
        return savedBooking;
    }

    private List<TimeSlot> getRequiredTimeSlots(Long timeSlotId, int numberOfRequiredTimeSlots) {
        List<TimeSlot> availableSlots = new ArrayList<>();

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

    private boolean isStaffAvailable(Staff staff, List<TimeSlot> timeSlots, LocalDate bookingDate) {
        for (TimeSlot timeSlot : timeSlots) {
            if (isTimeSlotBooked(timeSlot, bookingDate, staff)) {
                return false;
            }
        }
        return true;
    }

    private Staff findLeastBusyStaff(List<TimeSlot> timeSlots, LocalDate bookingDate) {
        return staffRepository.findByRole(Role.STYLIST).stream()
                .filter(staff -> isStaffAvailable(staff, timeSlots, bookingDate))
                .min((s1, s2) -> Integer.compare(countBookings(s1, bookingDate), countBookings(s2, bookingDate)))
                .orElseThrow(() -> new ValidationException("No available staff members for the selected time slots."));
    }

    private int countBookings(Staff staff, LocalDate bookingDate) {
        return bookingRepository.countByStaffAndBookingDateAndStatusNot(staff, bookingDate, BookingStatus.CANCELLED);
    }

    public List<Booking> getListBookings() {
        Account account = authenticationService.getCurrentAccount();

        List<Booking> bookings = bookingRepository.findByAccount(account);
        return bookings;
    }

    public List<Booking> getListBookingsAdmin() {
        Account account = authenticationService.getCurrentAccount();
        if (!account.isSuperUser() && account.getStaff().getRole() == Role.MANAGER) {
            return bookingRepository.findAll();
        } else if (account.getStaff().getRole() == Role.STYLIST) {
            return bookingRepository.findByStaff(account.getStaff());
        }
        return null;
    }

    public Booking getBookingDetails(Long bookingId) {
        Account account = authenticationService.getCurrentAccount();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found with id: " + bookingId));

        if (booking.getAccount().getId() != account.getId()) {
            throw new ValidationException("This booking does not belong to the logged-in account.");
        }

        return booking;
    }

    public Booking getBookingDetailsAdmin(Long bookingId) {
        Account account = authenticationService.getCurrentAccount();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found with id: " + bookingId));

        if (!account.isSuperUser() && account.getStaff().getRole() != Role.MANAGER) {
            if (booking.getStaff().getId() != account.getStaff().getId()) {
                throw new ValidationException("This booking does not belong to the logged-in account.");
            }
        }

        return booking;
    }

    public Booking partialUpdateBooking(Long bookingId, BookingStatusRequest newStatus) {
        Account account = authenticationService.getCurrentAccount();

        if (account.getRole() == Role.CUSTOMER && newStatus.getStatus() != BookingStatus.CANCELLED.toString()) {
            throw new ValidationException("Customer can only cancel the booking");
        }
        Booking booking = getBookingDetailsAdmin(bookingId);
        booking.setStatus(newStatus.getBookingEnum());
        return bookingRepository.save(booking);
    }

    public BookingResponse generateBookingResponse(Booking booking) {
        BookingResponse bookingResponse = modelMapper.map(booking, BookingResponse.class);

        bookingResponse.setStaffName(booking.getStaff().getAccount().getFullName());
        bookingResponse.setProduct(modelMapper.map(booking.getProduct(), ProductCloneResponse.class));
        bookingResponse.setStartTime(booking.getFirstStartTime());
        bookingResponse.setEndTime(booking.getLastEndTime());
        bookingResponse.setStatus(booking.getStatus());

        return bookingResponse;
    }

    public List<BookingResponse> generateBookingResponseList(List<Booking> bookingList) {
        return bookingList.stream()
                .map(this::generateBookingResponse)
                .collect(Collectors.toList());
    }

    public List<Staff> getAvailableStaff(LocalDate bookingDate, Long productId, Long timeSlotId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + productId));

        int numberOfRequiredTimeSlots = (int) Math.ceil(product.getTime() / 30.0);

        List<TimeSlot> timeSlots = getRequiredTimeSlots(timeSlotId, numberOfRequiredTimeSlots);

        List<Staff> allStylists = staffRepository.findByRole(Role.STYLIST);

        List<Staff> availableStaff = allStylists.stream()
                .filter(staff -> isStaffAvailable(staff, timeSlots, bookingDate))
                .collect(Collectors.toList());

        return availableStaff;
    }

    public List<TimeSlot> getAvailableTimeSlots(Long staffId, LocalDate bookingDate, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + productId));

        int numberOfRequiredTimeSlots = (int) Math.ceil(product.getTime() / 30.0);

        List<TimeSlot> allTimeSlots = timeSlotRepository.findAll(); // Adjust this based on your implementation

        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new NotFoundException("Staff not found with id: " + staffId));

        if (staff.getRole() != Role.STYLIST) {
            throw new ValidationException("Can't query timeslot for staff that is not Stylist");
        }

        List<TimeSlot> availableTimeSlots = allTimeSlots.stream()
                .filter(timeSlot -> isStaffAvailable(staff,
                        getRequiredTimeSlots(timeSlot.getId(), numberOfRequiredTimeSlots), bookingDate))
                .collect(Collectors.toList());

        return availableTimeSlots;
    }

}