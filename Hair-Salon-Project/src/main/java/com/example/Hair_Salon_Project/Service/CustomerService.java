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
// ModelMapper modelMapper;

// @Autowired
// AuthenticationService authenticationService;

// @Autowired
// ProductRepository productRepository;

// @Autowired
// FeedbackRepository feedbackRepository;

// public Booking createNewBooking(BookingRequest bookingRequest){
// if (bookingRequest.getBookingDate() == null ||
// bookingRequest.getProductType() == null || bookingRequest.getProduct() ==
// null ) {
// throw new IllegalArgumentException("Thông tin đặt lịch không đầy đủ.");
// }

// try {
// Booking booking = modelMapper.map(bookingRequest, Booking.class);
// Account accountRequest = authenticationService.getCurrentAccount();
// booking.setAccount(accountRequest);
// booking.setCreateDate(bookingRequest.getCreateDate());

// // Tìm kiếm dịch vụ dựa trên serviceType
// Product product =
// productRepository.findProductByTypeAndId(bookingRequest.getProduct().getType(),bookingRequest.getProduct().getId());
// if (product == null ||
// !product.getType().equals(bookingRequest.getProductType())) {
// throw new IllegalArgumentException("Dịch vụ không tồn tại.");
// }
// booking.setProduct(product);

// // Kiểm tra xem người dùng có chọn stylist không
// if (bookingRequest.getStaff() != null) {
// Staff selectedStaff =
// staffRepository.findById(bookingRequest.getStaff().getId())
// .orElseThrow(() -> new IllegalArgumentException("Stylist không tồn tại."));

// // // Kiểm tra vai trò của stylist
// // if (selectedStaff.getRole() != Role.STYLIST) {
// // throw new IllegalArgumentException("Người dùng đã chọn không phải là
// stylist.");
// // }

// booking.setStaff(selectedStaff);
// } else {
// // Tự động chọn stylist có trạng thái rảnh
// Staff availableStaff = staffRepository.findAvailableStylist(Role.STYLIST);
// if (availableStaff == null) {
// throw new IllegalArgumentException("Không có stylist nào rảnh.");
// }
// booking.setStaff(availableStaff);
// }

// Booking newBooking =bookingRepository.save(booking);
// return newBooking;
// } catch (Exception e) {
// throw new RuntimeException(e);
// }
// }

// public List<BookingStatus> getAllBooking() {
// try {
// Account accountRequest = authenticationService.getCurrentAccount();
// List<Booking> bookingList =
// bookingRepository.findBookingByAccount_Id(accountRequest.getId());
// List<BookingStatus> bookingStatusList = new ArrayList<>();
// for(Booking booking: bookingList){
// BookingStatus bookingStatus = new BookingStatus();
// bookingStatus.setNote(booking.getNote());
// bookingStatus.setProductType(booking.getProduct().getType());
// bookingStatus.setBookingDate(booking.getBookingDate());
// bookingStatus.setCreateDate(booking.getCreateDate());
// bookingStatus.setStatus(booking.getStatus());
// bookingStatus.setStaffName(booking.getStaff().getFirstName() + " " +
// booking.getStaff().getLastName());
// bookingStatusList.add(bookingStatus);
// }
// return bookingStatusList;
// } catch (Exception e) {
// throw new RuntimeException(e);
// }
// }

// public Feedback createFeedback(FeedbackRequest feedbackRequest){
// try {
// Feedback feedback = modelMapper.map(feedbackRequest, Feedback.class);
// Account accountRequest = authenticationService.getCurrentAccount();
// feedback.setAccount(accountRequest);
// feedback.setCreateDate(feedbackRequest.getCreateDate());
// feedback.setFeedbackText(feedbackRequest.getFeedbackText());
// feedback.setRating(feedbackRequest.getRating());
// Feedback newFeedback = feedbackRepository.save(feedback);
// return newFeedback;
// } catch (Exception e) {
// throw new RuntimeException(e);
// }
// }

// public Account updateAccount(AccountUpdateRequest accountUpdateRequest) {
// try {
// Account account = authenticationService.getCurrentAccount();

// if(accountUpdateRequest.getFirstName() != null) {
// account.setFirstName(accountUpdateRequest.getFirstName());
// }

// if(accountUpdateRequest.getLastName() != null) {
// account.setLastName(accountUpdateRequest.getLastName());
// }

// if (accountUpdateRequest.getPhone() != null) {
// account.setPhone(accountUpdateRequest.getPhone());
// }

// if (accountUpdateRequest.getGender() != null) {
// account.setGender(accountUpdateRequest.getGender());
// }

// if(accountUpdateRequest.getBirthday() != null) {
// account.setBirthday(accountUpdateRequest.getBirthday());
// }

// return accountRepository.save(account);
// } catch (Exception e) {
// throw new RuntimeException(e);
// }
// }
// }
