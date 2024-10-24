/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package APINoticias.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;

/**
 *
 * @author Computadora
 */
public class News {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String author;

    @Temporal(TemporalType.TIMESTAMP)
    private Date publishedDate;

    public Long getId() {        return id;    }

    public void setId(Long id) {        this.id = id;    }

    public String getTitle() {        return title;    }

    public void setTitle(String title) {        this.title = title;    }

    public String getContent() {        return content;    }

    public void setContent(String content) {        this.content = content;    }

    public String getAuthor() {        return author;    }

    public void setAuthor(String author) {        this.author = author;    }

    public Date getPublishedDate() {        return publishedDate;    }

    public void setPublishedDate(Date publishedDate) {        this.publishedDate = publishedDate;    }
    
    
}
