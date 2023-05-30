package org.boxclub.core.datatypes;

import java.util.List;

public record BinRecommandation(int numberSizes, List<Bin> bins, double volumeUsed) {
    
}
