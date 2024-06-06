package com.grupo04.ahorraya.models.dtos;

import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.models.entities.Store;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddImageDTO {
    @NotNull(message = "File can't be empty")
    private MultipartFile file;
    @NotNull(message = "Store can't be empty")
    private UUID store;
    @NotNull(message = "Offer can't be empty")
    private UUID offer;
}
