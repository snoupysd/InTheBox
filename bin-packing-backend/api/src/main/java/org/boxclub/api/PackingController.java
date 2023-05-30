package org.boxclub.api;

import java.util.ArrayList;
import java.util.List;

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
        Bin bin = new Bin("mybin", 1, 1, 1, 1, 1, -1);
        // TODO list or array?
        List<BinRecommandation> binRecommandations = new ArrayList<>();
        binRecommandations.add(null);
        for (int i = 1; i < request.maxSizes() + 1; i++) {
            List<Bin> binList = new ArrayList<>();
            for (int j = 0; j < i; j++) {
                binList.add(bin);
            }
            binRecommandations.add(new BinRecommandation(i, binList, 0));
        }
        return new OrderAnalysisResponse(binRecommandations);
    }
}