package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Exception.DuplicateEntity;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Model.AccountUpdateRequest;
import com.example.Hair_Salon_Project.Model.RoleRequest;
import com.example.Hair_Salon_Project.Model.StaffRequest;
import com.example.Hair_Salon_Project.Model.StaffResponse;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import com.example.Hair_Salon_Project.Repository.AccountRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.validation.ConstraintViolationException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ModelMapper modelMapper;

    // TODO: change role
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(long id) {
        // TODO: Check if role != MANAGER, only can get that staff id
        return staffRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Staff not found with id: " + id));
    }

    public Staff getStaffByIdAuthorize(long id) {
        Account currentAccount = authenticationService.getCurrentAccount();
        if (!currentAccount.isSuperUser()) {
            Optional<Staff> staff = staffRepository.getStaffByAccountId(currentAccount.getId());
            if (staff.isPresent()) {
                if (staff.get().getRole() == Role.STYLIST || staff.get().getRole() == Role.CASHIER) {
                    if (staff.get().getId() != id) {
                        throw new RuntimeException("You do not have permission to get this staff.");
                    }
                }
                return getStaffById(id);
            }
        } else {
            return getStaffById(id);
        }
        return null;
    }

    public Staff addStaffByPhone(StaffRequest staffRequest) {
        Optional<Staff> existingStaff = staffRepository.findByPhone(staffRequest.getPhone());
        if (existingStaff.isPresent() && existingStaff.get().isStaff()) {
            throw new RuntimeException(
                    "Staff member already exists with phone: " + staffRequest.getPhone());
        } else if (existingStaff.isPresent() && !existingStaff.get().isStaff()) {
            Staff addStaff = existingStaff.get();
            addStaff.setIsStaff(true);
            return staffRepository.save(addStaff);
        }

        Optional<Account> existingAccount = accountRepository.findByPhone(staffRequest.getPhone());
        if (existingAccount.isPresent()) {
            Account account = existingAccount.get();
            Staff newStaff = new Staff();
            newStaff.setAccount(account);
            newStaff.setRole(staffRequest.getRoleEnum());
            return staffRepository.save(newStaff);
        } else {
            throw new NotFoundException("No account found with phone: " + staffRequest.getPhone());
        }
    }

    public Staff updateStaff(long id, AccountUpdateRequest accountUpdateRequest) {
        try {
            Staff staff = getStaffById(id);
            Account currentAccount = authenticationService.getCurrentAccount();
            if (staff.getAccount() == null || staff.getAccount().getId() != currentAccount.getId()) {
                throw new RuntimeException("You do not have permission to update this staff member's account.");
            }
            if (accountRepository.existsByPhone(accountUpdateRequest.getPhone())) {
                throw new DuplicateEntity("Phone number already exists.");
            }
            modelMapper.map(accountUpdateRequest, staff.getAccount());
            return staffRepository.save(staff);
        } catch (ConstraintViolationException e) {
            String violations = e.getConstraintViolations().stream()
                    .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: "
                            + violation.getMessage())
                    .collect(Collectors.joining(", "));
            throw new RuntimeException(violations);
        }
    }

    public Staff updateRoleStaff(long id, RoleRequest roleRequest) {
        Staff staff = getStaffById(id);
        staff.setRole(roleRequest.getRoleEnum());
        return staffRepository.save(staff);
    }

    public Staff deactivateStaff(long id) {
        Staff staff = getStaffById(id);
        staff.setIsStaff(false);
        return staffRepository.save(staff);
    }

    public StaffResponse generateStaffResponse(Staff staff) {
        StaffResponse response = new StaffResponse();
        response.setStaffId(staff.getId());
        response.setRole(staff.getRole().name());
        response.setStaff(staff.isStaff());
        Account account = staff.getAccount();
        response.setFirstName(account.getFirstName());
        response.setLastName(account.getLastName());
        response.setEmail(account.getEmail());
        response.setPhone(account.getPhone());
        response.setGender(account.getGender().name());
        response.setBirthDate(account.getBirthDate());
        return response;
    }

    public List<StaffResponse> generateStaffResponseList(List<Staff> staffList) {
        return staffList.stream()
                .map(this::generateStaffResponse) // Use the existing method
                .collect(Collectors.toList());
    }
}
