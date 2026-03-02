package com.feedback.repository;

import com.feedback.model.Donation;
import com.feedback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByUser(User user);
    List<Donation> findByStatus(String status);
}
