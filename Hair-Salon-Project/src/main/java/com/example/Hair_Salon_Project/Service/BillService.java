package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Bill;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Repository.BillRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private StaffRepository staffRepository;

    public Bill createBill(Bill bill, long staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        bill.setStaff(staff);
        return billRepository.save(bill);
    }

    public Bill updateBill(long billId, Bill billDetails) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
        bill.setTotalAmount(billDetails.getTotalAmount());
        // Update other fields as necessary
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public List<Bill> getBillsByStaff(long staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        return billRepository.findByStaff(staff);
    }
}
