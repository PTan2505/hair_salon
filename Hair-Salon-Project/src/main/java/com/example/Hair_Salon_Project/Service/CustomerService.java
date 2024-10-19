// package com.example.Hair_Salon_Project.Service;

// import com.example.Hair_Salon_Project.Entity.*;
// import com.example.Hair_Salon_Project.Entity.Enums.Role;
// import com.example.Hair_Salon_Project.Model.AccountUpdateRequest;
// import com.example.Hair_Salon_Project.Model.BookingRequest;
// import com.example.Hair_Salon_Project.Model.BookingStatus;
// import com.example.Hair_Salon_Project.Model.FeedbackRequest;
// import com.example.Hair_Salon_Project.Repository.*;
// import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.ArrayList;
// import java.util.List;

// import java.time.LocalDate;
// import java.time.LocalDateTime;

// @Service
// public class CustomerService {

// @Autowired
// private BookingRepository bookingRepository;

// @Autowired
// private AccountRepository accountRepository;

// @Autowired
// private StaffRepository staffRepository;

// @Autowired
// private ModelMapper modelMapper;

// @Autowired
// private AuthenticationService authenticationService;

// @Autowired
// private ProductRepository productRepository;

// @Autowired
// private FeedbackRepository feedbackRepository;

// public Booking createNewBooking(BookingRequest bookingRequest) {
// // Validate booking request fields
// if (bookingRequest.getBookingDate() == null || bookingRequest.getProduct() ==
// null) {
// throw new IllegalArgumentException("Thông tin đặt lịch không đầy đủ.");
// }

// // Try to create a new booking
// try {
// Booking booking = modelMapper.map(bookingRequest, Booking.class);
// Account accountRequest = authenticationService.getCurrentAccount();
// booking.setAccount(accountRequest);
// booking.setCreateDate(bookingRequest.getCreateDate());

// // Find the product directly by ID
// Product product =
// productRepository.findById(bookingRequest.getProduct().getId())
// .orElseThrow(() -> new IllegalArgumentException("Dịch vụ không tồn tại."));

// booking.setProduct(product);

// // Calculate the number of time slots needed
// int numberOfTimeSlots = (product.getTime() + 29) / 30; // Round up to the
// nearest half hour

// // Check if the user has selected a stylist
// if (bookingRequest.getStaff() != null) {
// Staff selectedStaff =
// staffRepository.findById(bookingRequest.getStaff().getId())
// .orElseThrow(() -> new IllegalArgumentException("Stylist không tồn tại."));
// booking.setStaff(selectedStaff);
// } else {
// // Automatically select an available stylist
// Staff availableStaff = findAvailableStylist(bookingRequest.getBookingDate(),
// numberOfTimeSlots,
// product);
// if (availableStaff == null) {
// throw new IllegalArgumentException("Không có stylist nào rảnh.");
// }
// booking.setStaff(availableStaff);
// }

// return bookingRepository.save(booking); // Save and return the new booking
// } catch (Exception e) {
// throw new RuntimeException("Error creating booking: " + e.getMessage(), e);
// }
// }

// private Staff findAvailableStylist(LocalDate bookingDate, int
// numberOfTimeSlots, Product product) {
// // Find available stylists (staff with the STYLIST role)
// List<Staff> stylists = staffRepository.findAllByRole(Role.STYLIST);

// // Check availability based on booking date and required time slots
// for (Staff stylist : stylists) {
// // Check if the stylist has available time slots
// boolean isAvailable = true;

// // Here, you would check against the stylist's existing bookings
// // For example, check if the stylist has bookings during the required time
// slots
// // on the booking date
// for (int i = 0; i < numberOfTimeSlots; i++) {
// LocalDateTime bookingStartTime = bookingDate.atStartOfDay().plusMinutes(i *
// 30);
// LocalDateTime bookingEndTime = bookingStartTime.plusMinutes(30);
// if
// (bookingRepository.existsByStylistAndBookingDateAndTimeSlot(stylist.getId(),
// bookingStartTime,
// bookingEndTime)) {
// isAvailable = false;
// break;
// }
// }

// if (isAvailable) {
// return stylist; // Return the first available stylist
// }
// }
// return null; // No available stylist found
// }

// public List<BookingStatus> getAllBooking() {
// try {
// Account accountRequest = authenticationService.getCurrentAccount();
// List<Booking> bookingList =
// bookingRepository.findBookingByAccount_Id(accountRequest.getId());

// List<BookingStatus> bookingStatusList = new ArrayList<>();
// for (Booking booking : bookingList) {
// BookingStatus bookingStatus = new BookingStatus();
// bookingStatus.setNote(booking.getNote());
// bookingStatus.setBookingDate(booking.getBookingDate());
// bookingStatus.setCreateDate(booking.getCreateDate());
// bookingStatus.setStatus(booking.getStatus());

// // Avoid NullPointerException when getting staff name
// if (booking.getStaff() != null) {
// bookingStatus.setStaffName(booking.getStaff().getFirstName() + " " +
// booking.getStaff().getLastName());
// } else {
// bookingStatus.setStaffName("Chưa chọn stylist");
// }

// bookingStatusList.add(bookingStatus);
// }
// return bookingStatusList;
// } catch (Exception e) {
// throw new RuntimeException("Error retrieving bookings: " + e.getMessage(),
// e);
// }
// }

// public Feedback createFeedback(FeedbackRequest feedbackRequest) {
// try {
// Feedback feedback = modelMapper.map(feedbackRequest, Feedback.class);
// Account accountRequest = authenticationService.getCurrentAccount();
// feedback.setAccount(accountRequest);
// feedback.setCreateDate(feedbackRequest.getCreateDate());
// feedback.setFeedbackText(feedbackRequest.getFeedbackText());
// feedback.setRating(feedbackRequest.getRating());

// return feedbackRepository.save(feedback); // Save and return new feedback
// } catch (Exception e) {
// throw new RuntimeException("Error creating feedback: " + e.getMessage(), e);
// }
// }

// public Account updateAccount(AccountUpdateRequest accountUpdateRequest) {
// try {
// Account account = authenticationService.getCurrentAccount();

// // Update fields conditionally
// if (accountUpdateRequest.getFirstName() != null) {
// account.setFirstName(accountUpdateRequest.getFirstName());
// }

// if (accountUpdateRequest.getLastName() != null) {
// account.setLastName(accountUpdateRequest.getLastName());
// }

// if (accountUpdateRequest.getPhone() != null) {
// account.setPhone(accountUpdateRequest.getPhone());
// }

// if (accountUpdateRequest.getGender() != null) {
// account.setGender(accountUpdateRequest.getGender());
// }

// if (accountUpdateRequest.getBirthday() != null) {
// account.setBirthday(accountUpdateRequest.getBirthday());
// }

// return accountRepository.save(account); // Save and return the updated
// account
// } catch (Exception e) {
// throw new RuntimeException("Error updating account: " + e.getMessage(), e);
// }
// }
// }
