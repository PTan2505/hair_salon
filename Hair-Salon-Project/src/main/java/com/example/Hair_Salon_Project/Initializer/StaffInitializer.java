// package com.example.Hair_Salon_Project.Initializer;

// import com.example.Hair_Salon_Project.Entity.Account;
// import com.example.Hair_Salon_Project.Entity.Staff;
// import com.example.Hair_Salon_Project.Entity.Enums.Role;
// import com.example.Hair_Salon_Project.Repository.AccountRepository;
// import com.example.Hair_Salon_Project.Repository.StaffRepository;
// import jakarta.annotation.PostConstruct;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.Arrays;
// import java.util.List;

// @Service
// public class StaffInitializer {

// @Autowired
// private AccountRepository accountRepository;

// @Autowired
// private StaffRepository staffRepository;

// @PostConstruct
// public void init() {
// // Check if there are no staff members already initialized
// if (staffRepository.count() == 0) {
// initializeStaffData();
// }
// }

// private void initializeStaffData() {
// // Fetch the existing accounts (assuming they're already populated)
// List<Account> accounts = accountRepository.findAll();

// // Assuming the accounts have ids from 2 onwards, since account 1 is a super
// // user
// List<Staff> staffList = Arrays.asList(
// createStaff(accounts.get(2), Role.MANAGER), // Account with ID 2
// createStaff(accounts.get(3), Role.CASHIER), // Account with ID 3
// createStaff(accounts.get(4), Role.MANAGER), // Account with ID 4
// createStaff(accounts.get(5), Role.STYLIST), // Account with ID 5
// createStaff(accounts.get(6), Role.CASHIER) // Account with ID 6
// );

// // Save all staff members to the database
// staffRepository.saveAll(staffList);
// }

// private Staff createStaff(Account account, Role role) {
// Staff staff = new Staff();
// staff.setAccount(account);
// staff.setRole(role);
// staff.setIsStaff(true); // Mark as active staff
// return staff;
// }
// }
