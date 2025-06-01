package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.cart.AddToCartRequest;
import pl.umcs.springlibrarybackend.dto.cart.CartDto;
import pl.umcs.springlibrarybackend.dto.cart.CartItemDto;
import pl.umcs.springlibrarybackend.dto.cart.CheckoutResponse;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.service.interfaces.CartService;

import java.util.List;

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

    @PostMapping("/{cartId}/checkout")
    public ResponseEntity<ApiResponse<CheckoutResponse>> checkout(
            @PathVariable String cartId
    ) {
        CheckoutResponse response = cartService.createCheckoutSession(cartId);
        return ResponseEntity.ok(
                ApiResponse.success("Checkout session created successfully", response)
        );
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<CartDto>> getCart(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        CartDto cartDto = cartService.getCartDetails(userDetails.getId());

        return ResponseEntity.ok(
                ApiResponse.success("Cart retrieved successfully", cartDto)
        );
    }

    @GetMapping("/items")
    public ResponseEntity<ApiResponse<List<CartItemDto>>> getCartItems(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        List<CartItemDto> cartItems = cartService.getCartItems(userDetails.getId());

        return ResponseEntity.ok(
                ApiResponse.success("Cart items retrieved successfully", cartItems)
        );
    }

    @DeleteMapping("/items/{bookId}")
    public ResponseEntity<ApiResponse<Void>> removeFromCart(
            @PathVariable String bookId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        cartService.removeFromCart(bookId, userDetails.getId());
        return ResponseEntity.ok(
                ApiResponse.success("Book removed from cart successfully")
        );
    }
}
