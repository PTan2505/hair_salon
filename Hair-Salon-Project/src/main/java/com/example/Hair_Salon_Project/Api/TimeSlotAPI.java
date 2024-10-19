// package com.example.Hair_Salon_Project.Api;

// import com.example.Hair_Salon_Project.Entity.TimeSlot;
// import com.example.Hair_Salon_Project.Service.TimeSlotService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/time-slots")
// public class TimeSlotAPI {

// @Autowired
// private TimeSlotService timeSlotService;

// // Get all TimeSlots
// @GetMapping
// public ResponseEntity<List<TimeSlot>> getAllTimeSlots() {
// List<TimeSlot> timeSlots = timeSlotService.getAllTimeSlots();
// return ResponseEntity.ok(timeSlots);
// }

// // Get a TimeSlot by ID
// @GetMapping("/{id}")
// public ResponseEntity<TimeSlot> getTimeSlotById(@PathVariable long id) {
// TimeSlot timeSlot = timeSlotService.getTimeSlotById(id);
// return ResponseEntity.ok(timeSlot);
// }

// // Create a new TimeSlot
// @PostMapping
// public ResponseEntity<TimeSlot> createTimeSlot(@RequestBody TimeSlot
// timeSlot) {
// TimeSlot createdTimeSlot = timeSlotService.createTimeSlot(timeSlot);
// return ResponseEntity.ok(createdTimeSlot);
// }

// // Update an existing TimeSlot
// @PutMapping("/{id}")
// public ResponseEntity<TimeSlot> updateTimeSlot(@PathVariable long id,
// @RequestBody TimeSlot timeSlotDetails) {
// TimeSlot updatedTimeSlot = timeSlotService.updateTimeSlot(id,
// timeSlotDetails);
// return ResponseEntity.ok(updatedTimeSlot);
// }

// // Delete a TimeSlot
// @DeleteMapping("/{id}")
// public ResponseEntity<Void> deleteTimeSlot(@PathVariable long id) {
// timeSlotService.deleteTimeSlot(id);
// return ResponseEntity.noContent().build();
// }
// }
