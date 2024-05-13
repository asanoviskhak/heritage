"use client";
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import dagre from 'cytoscape-dagre';
import cytoscape from "cytoscape";
import {TreeNodeDefinition} from "@/core/types/tree-definition";
import CytoscapeComponent from 'react-cytoscapejs';
import {useEffect, useState} from "react";
import {TreePersonInfoDrawer} from "@/components/tree/TreePersonInfoDrawer";
import Preloader from "@/components/other/Preloader";
import {cytoscapeLayouts} from "@/core/data/cytoscape-layouts";
import {useTreeStore} from "@/core/stores/tree";
import {cytoscapeThemes} from "@/core/styles/cytoscape-theme";


export function TreeInteractiveViewer() {

  cytoscape.use(cola);
  cytoscape.use(dagre);

  const treeStore = useTreeStore();

  const [graph, setGraph] = useState<TreeNodeDefinition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [layout, setLayout] = useState(cytoscapeLayouts[treeStore.layout]);


  useEffect(() => {

    fetch('/api/get-nodes', {
      method: 'POST',
      body: JSON.stringify({ limit: 2500 }),
    }).then((res) => res.json()).then((data: TreeNodeDefinition[]) => {
      setGraph(data);
      setLoading(false);
    });

  }, []);


  useEffect(() => {

    if (!treeStore.cy) {
      return;
    }

    setLayout(cytoscapeLayouts[treeStore.layout]);

  }, [treeStore.layout]);


  const handleNodeClick = (evt: any) => {

    treeStore.setHighlightType(evt);

    const target = evt.target;

    if (target === treeStore.cy || !target.isNode()) {
      treeStore.setSelected(null);
      return;
    }

    treeStore.setSelected(target.data());

  }


  return (
      <div className="flex">

          {!loading && (
              <CytoscapeComponent
                  elements={graph}
                  stylesheet={cytoscapeThemes as any}
                  layout={layout}
                  zoomingEnabled={true}
                  maxZoom={1}
                  minZoom={0.1}
                  autounselectify={false}
                  boxSelectionEnabled={false}
                  style={{ width: '100vw', height: '100vh' }}
                  cy={(cy: cytoscape.Core) => {
                      treeStore.cy = cy;
                      cy.on('tap', handleNodeClick);
                  }}
              />
          )}

        <TreePersonInfoDrawer />

        {loading && <Preloader />}

      </div>
  );

}


