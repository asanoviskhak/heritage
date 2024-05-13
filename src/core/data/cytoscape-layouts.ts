import {ECytoscapeLayouts} from "@/core/types/tree";


export const cytoscapeLayouts: { [key in ECytoscapeLayouts]: any; }  = {
    [ECytoscapeLayouts.Cola]: {
        name: 'cola',
        infinite: false,
        animate: true,
        directed: false,
        avoidOverlap: false,
        fit: false,
        padding: 30,
        nodeDimensionsIncludeLabels: false,
        randomize: false,
        handleDisconnected: false,
        convergenceThreshold: 1.01,
    },
    [ECytoscapeLayouts.Dagre]: {
        name: 'dagre',
        infinite: false,
        animate: false,
        directed: false,
        avoidOverlap: true,
        fit: true,
        padding: 30,
        nodeDimensionsIncludeLabels: true,
        randomize: false,
        handleDisconnected: false,
        convergenceThreshold: 0.01,
    },
}