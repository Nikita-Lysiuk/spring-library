package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.cart.AddToCartRequest;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.service.interfaces.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> addToCart(
            @RequestBody AddToCartRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ) {
        cartService.addToCart(request.getBookId(), userDetails.getId());
        return ResponseEntity.ok(
                ApiResponse.success("Book added to cart successfully")
        );
    }
}
