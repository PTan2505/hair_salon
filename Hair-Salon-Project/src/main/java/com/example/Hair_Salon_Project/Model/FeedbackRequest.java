package com.example.Hair_Salon_Project.Model;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.util.Date;

@Data
public class FeedbackRequest {
    String feedbackText;

    @Min(1)
    @Max(5)
    int rating;

    @Temporal(TemporalType.TIMESTAMP)
    Date createDate;
}
