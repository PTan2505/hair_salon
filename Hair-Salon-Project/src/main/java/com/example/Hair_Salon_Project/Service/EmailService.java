package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Model.EmailDetail;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private static final String RESET_PASSWORD_URL = "http://localhost:8080/reset-password?token="; // Consider moving to properties file

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmail(EmailDetail emailDetail) {
        logger.info("Preparing to send email to: {}", emailDetail.getAccount().getEmail());
        try {
            Context context = new Context();
            context.setVariable("name", emailDetail.getAccount().getFirstName());
            context.setVariable("button", "Go to B learning");
            context.setVariable("link", emailDetail.getLink());
            String template = templateEngine.process("welcome-template", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom("admin@gmail.com"); // Consider using a config property
            mimeMessageHelper.setTo(emailDetail.getAccount().getEmail());
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            mimeMessageHelper.setText(template, true); // Send HTML email

            mailSender.send(mimeMessage);
            logger.info("Email successfully sent to: {}", emailDetail.getAccount().getEmail());
        } catch (Exception e) {
            logger.error("Error sending email to: {}", emailDetail.getAccount().getEmail(), e);
            throw new RuntimeException("Unable to send email", e);
        }
    }

    public void sendResetPasswordEmail(Account account, String token) {
        logger.info("Preparing to send reset password email to: {}", account.getEmail());
        try {
            String resetPasswordLink = RESET_PASSWORD_URL + token;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setTo(account.getEmail());
            mimeMessageHelper.setSubject("Reset Password - Hair Salon");
            mimeMessageHelper.setText("Hello " + account.getFirstName() + ",\n\n"
                    + "You have requested to reset your password. Please click the link below to reset your password:\n"
                    + resetPasswordLink + "\n\n"
                    + "If you did not request this, please ignore this email.\n\n"
                    + "Best regards,\n"
                    + "The Hair Salon Team", false);

            mailSender.send(mimeMessage);
            logger.info("Reset password email successfully sent to: {}", account.getEmail());
        } catch (Exception e) {
            logger.error("Error sending reset password email to: {}", account.getEmail(), e);
            throw new RuntimeException("Unable to send reset password email", e);
        }
    }
}
