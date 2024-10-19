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

// // Check if the user has selected a stylist
// if (bookingRequest.getStaff() != null) {
// Staff selectedStaff =
// staffRepository.findById(bookingRequest.getStaff().getId())
// .orElseThrow(() -> new IllegalArgumentException("Stylist không tồn tại."));

// booking.setStaff(selectedStaff);
// } else {
// // Automatically select an available stylist
// Staff availableStaff = staffRepository.findAvailableStylist(Role.STYLIST);
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
