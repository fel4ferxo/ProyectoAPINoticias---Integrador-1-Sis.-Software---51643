/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package APINoticias.repository;

import APINoticias.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Computadora
 */
public interface NewsRepository extends JpaRepository<News, Long> {
}
