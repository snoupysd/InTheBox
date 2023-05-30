package org.boxclub.core.datatypes;

public record OrderItem(String orderId, String id, int x, int y, int z, int weight, int count) {
}
