package org.boxclub.api;

import org.boxclub.core.datatypes.*;
import org.boxclub.core.packing.BruteforceSolver;
import org.boxclub.core.packing.LargestAreaFitFirstSolver;
import org.boxclub.core.packing.PackingSolver;
import org.boxclub.core.sorting.DefaultPlacementComparator;
import org.boxclub.core.sorting.SortingPackingDecorator;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
// the local host port we are communicating with (the one of the visualisation)
@CrossOrigin(origins = "http://localhost:3000")
public class PackingController {
    private PackingSolver solver = new LargestAreaFitFirstSolver();
    private static final boolean USE_SORTING = true;

    @PostMapping("/pack")
    public PackingResponse pack(@RequestBody PackingRequest request) {
        switch (request.algorithm()) {
            case LARGEST_AREA_FIT_FIRST -> solver = new LargestAreaFitFirstSolver();
            case BRUTEFORCE -> solver = new BruteforceSolver();
        }
        if (USE_SORTING) solver = new SortingPackingDecorator(solver, new DefaultPlacementComparator());
        return solver.pack(request);
    }

    @PostMapping("/order-analysis")
    public OrderAnalysisResponse analyseOrders(@RequestBody OrderAnalysisRequest request) {
        // TODO code here (currently stub)
        Bin testbin = new Bin("mybin", 1, 1, 1, 1, 1, -1);
        
        BinRecommandation[] binRecommandations = new BinRecommandation[request.maxSizes() + 1];
        binRecommandations[0] = null;
        for (int i = 1; i < request.maxSizes() + 1; i++) {
            Bin[] binArray = new Bin[i];
            for (int j = 0; j < i; j++) {
                // i times the same bin for illustration
                binArray[j] = testbin;
            }

            binRecommandations[i] = new BinRecommandation(i, binArray, 0);
        }
        return new OrderAnalysisResponse(binRecommandations, true);
    }
}