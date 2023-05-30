package org.boxclub.core.datatypes;

import java.util.List;

public record OrderAnalysisRequest(List<OrderItem> items, AlgorithmType algorithm,  int maxSizes) {
    
}
