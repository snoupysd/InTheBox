package org.boxclub.core.datatypes;

import java.util.List;

public record OrderAnalysisRequest(int maxSizes, AlgorithmType algorithm, List<OrderItem> orderItems) {
    
}
