import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const IconUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconDownload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconLayers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconEye = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IconTrash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
const IconZoomIn = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconZoomOut = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconUndo = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>;
const IconRefresh = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconUnlock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>;
const IconFlipH = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 9l-4-4-4 4M21 9H13.5M3 15l4 4 4-4M3 15h7.5M10.5 5v14M13.5 5v14"/></svg>;
const IconFlipV = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3l4 4-4 4M15 3V10.5M9 21l-4-4 4-4M9 21V13.5M5 10.5h14M5 13.5h14"/></svg>;
const IconCopy = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const IconCenter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><circle cx="12" cy="12" r="3"/></svg>;
const IconArrowUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
const IconArrowDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
const IconChevronsUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>;
const IconChevronsDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>;
const IconFolder = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
const IconFolderOpen = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="13" x2="15" y2="13"></line></svg>;
const IconFolderPlus = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>;
const IconChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const IconChevronDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>;

// --- Types ---
type LayerType = 'image' | 'group';

interface Layer {
  id: string;
  type: LayerType;
  name: string;
  visible: boolean;
  locked: boolean;
  expanded?: boolean; // Only for groups

  // Image specific
  src?: string;
  img?: HTMLImageElement;
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number;
  flipX: boolean;
  flipY: boolean;

  // Group specific
  children?: Layer[];
}

interface ViewTransform {
  scale: number;
  x: number;
  y: number;
}

interface OutputConfig {
  width: number;
  height: number;
}

interface HistoryState {
  layers: Layer[];
  config: OutputConfig;
}

interface SnapLines {
  x: number[];
  y: number[];
}

// --- Styles ---
const styles = `
  body, html { margin: 0; padding: 0; height: 100%; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #eef1f5; color: #333; overflow: hidden; }
  * { box-sizing: border-box; }
  
  .app-container { display: flex; height: 100vh; flex-direction: column; }
  
  /* Header */
  .header { height: 60px; background: white; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0; z-index: 20; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
  .logo { font-size: 18px; font-weight: 700; color: #1a1a1a; display: flex; align-items: center; gap: 8px; margin-right: 20px; white-space: nowrap; }
  .logo span { background: linear-gradient(135deg, #1890ff, #36cfc9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  
  .header-center { flex: 1; display: flex; justify-content: center; overflow: hidden; }

  .actions { display: flex; gap: 12px; align-items: center; }
  .btn { height: 36px; padding: 0 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; transition: all 0.2s; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; user-select: none; }
  .btn:active { transform: translateY(1px); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-primary { background: #1890ff; color: white; box-shadow: 0 2px 0 rgba(24, 144, 255, 0.1); }
  .btn-primary:hover:not(:disabled) { background: #40a9ff; box-shadow: 0 4px 8px rgba(24, 144, 255, 0.2); }
  .btn-secondary { background: #fff; border: 1px solid #d9d9d9; color: #333; }
  .btn-secondary:hover:not(:disabled) { border-color: #1890ff; color: #1890ff; background: #f0f7ff; }
  .btn.drag-active { background: #e6f7ff; border-color: #1890ff; border-style: dashed; color: #1890ff; }
  .btn-danger-text { color: #ff4d4f; background: transparent; border: 1px solid transparent; }
  .btn-danger-text:hover { background: #fff1f0; border-color: #ffa39e; }
  
  /* Edit Toolbar in Header */
  .edit-toolbar { display: flex; align-items: center; gap: 16px; padding: 0 10px; }
  .edit-section { display: flex; align-items: center; gap: 8px; border-right: 1px solid #eee; padding-right: 16px; }
  .edit-section:last-child { border-right: none; padding-right: 0; }
  .edit-label { font-size: 12px; color: #999; margin-right: 4px; display: none; }
  @media (min-width: 1200px) { .edit-label { display: inline-block; } }
  .slider-control { display: flex; align-items: center; gap: 8px; }
  .slider-control input[type=range] { width: 80px; }

  /* Main Layout */
  .workspace-wrapper { flex: 1; display: flex; overflow: hidden; position: relative; }
  
  /* Sidebar (Layers) */
  .sidebar { width: 280px; background: white; border-right: 1px solid #e8e8e8; display: flex; flex-direction: column; z-index: 10; flex-shrink: 0; }
  .sidebar-header { padding: 12px 16px; border-bottom: 1px solid #f0f0f0; font-weight: 600; font-size: 14px; display: flex; justify-content: space-between; align-items: center; color: #595959; background: #fafafa; }
  
  .layer-list { flex: 1; overflow-y: auto; padding: 12px 8px; display: flex; flex-direction: column; }
  .empty-layers { text-align: center; color: #999; margin-top: 40px; font-size: 13px; line-height: 1.5; padding: 0 20px; }
  
  /* Recursive Layer Items */
  .layer-item-wrapper { display: flex; flex-direction: column; margin-bottom: 4px; }
  .layer-item { 
    display: flex; align-items: center; padding: 6px 8px; background: #fff; border: 1px solid transparent; 
    border-radius: 6px; cursor: pointer; transition: all 0.2s; user-select: none;
    position: relative;
  }
  .layer-item:hover { background: #f9f9f9; }
  .layer-item.selected { background: #e6f7ff; border-color: #91d5ff; }
  .layer-item.selected:after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #1890ff; border-radius: 3px 0 0 3px; }
  .layer-item.drag-target-over { border-bottom: 2px solid #1890ff; }
  .layer-item.drag-target-in { background: #fff0f6; border: 1px dashed #eb2f96; }

  .layer-indent { width: 16px; flex-shrink: 0; }
  
  .layer-expand-btn { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #999; margin-right: 4px; border-radius: 4px; }
  .layer-expand-btn:hover { background: #eee; color: #666; }

  .layer-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #666; margin-right: 8px; background: #f5f5f5; border-radius: 4px; flex-shrink: 0; }
  .layer-thumb { width: 24px; height: 24px; object-fit: contain; background: #eee; border-radius: 4px; margin-right: 8px; border: 1px solid #f0f0f0; background-image: linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%); background-size: 8px 8px; }
  
  .layer-info { flex: 1; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
  .layer-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #333; }
  .layer-meta { font-size: 10px; color: #999; display: flex; gap: 6px; }
  
  .layer-actions { display: flex; gap: 2px; opacity: 0; margin-left: 8px; }
  .layer-item:hover .layer-actions { opacity: 1; }
  .layer-item.selected .layer-actions { opacity: 1; }
  .icon-btn { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 4px; border: none; background: transparent; color: #666; cursor: pointer; transition: all 0.2s; }
  .icon-btn:hover { background: #f0f0f0; color: #1890ff; }
  .icon-btn.delete:hover { background: #fff1f0; color: #ff4d4f; }
  .layer-handle { cursor: grab; padding: 4px; color: #ccc; margin-right: 4px; display: flex; align-items: center; }
  .layer-handle:hover { color: #666; }
  
  /* Canvas Area */
  .canvas-container { flex: 1; position: relative; background: #f0f2f5; overflow: hidden; cursor: grab; }
  .canvas-container.panning { cursor: grabbing; }
  .canvas-container.dragging { cursor: default; }
  
  /* Controls overlay */
  .canvas-controls { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: white; padding: 6px 12px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px; z-index: 50; }
  .zoom-val { font-size: 13px; font-variant-numeric: tabular-nums; width: 45px; text-align: center; color: #555; }
  
  /* Help Tooltip */
  .tooltip { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #666; pointer-events: none; border: 1px solid #ddd; z-index: 40; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

  /* Hidden inputs */
  .hidden { display: none; }
`;

// --- Constants ---
const INITIAL_ZOOM = 1.0;
const INITIAL_CONFIG = { width: 800, height: 800 };

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<ViewTransform>({ scale: INITIAL_ZOOM, x: 50, y: 50 });
  const [isButtonDragOver, setIsButtonDragOver] = useState(false);
  const [canvasConfig, setCanvasConfig] = useState<OutputConfig>(INITIAL_CONFIG);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [snapLines, setSnapLines] = useState<SnapLines>({ x: [], y: [] });
  
  // Undo/Redo History
  const [history, setHistory] = useState<HistoryState[]>([{ layers: [], config: INITIAL_CONFIG }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Refs for Async Access
  const layersRef = useRef(layers);
  const configRef = useRef(canvasConfig);

  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  useEffect(() => {
    configRef.current = canvasConfig;
  }, [canvasConfig]);

  // Dragging state ref
  const dragRef = useRef({
    isDragging: false,
    mode: 'none' as 'none' | 'pan' | 'move' | 'resize',
    handle: null as string | null, // tl, tm, tr, rm, br, bm, bl, lm
    startX: 0,
    startY: 0,
    // Snapshots of positions for all affected layers (handling groups)
    itemsStart: [] as { id: string, x: number, y: number, w: number, h: number }[],
    viewStart: { x: 0, y: 0 },
    id: null as string | null, 
    hasMoved: false,
  });

  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<'inside' | 'after' | null>(null);

  const isSpacePressed = useRef(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressed.current = true;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      // Delete key
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
          // Check if active element is input
          if (document.activeElement?.tagName !== 'INPUT') {
               handleDelete(null, selectedId);
          }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressed.current = false;
        if (!dragRef.current.isDragging && canvasRef.current) {
             canvasRef.current.style.cursor = 'default';
        }
      }
    };
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [historyIndex, history, selectedId]);

  // --- Helpers ---
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const getCursorForHandle = (handle: string) => {
    switch (handle) {
      case 'tl': return 'nw-resize';
      case 'tm': return 'n-resize';
      case 'tr': return 'ne-resize';
      case 'lm': return 'w-resize';
      case 'rm': return 'e-resize';
      case 'bl': return 'sw-resize';
      case 'bm': return 's-resize';
      case 'br': return 'se-resize';
      default: return 'default';
    }
  };

  const saveHistory = useCallback((newLayers: Layer[], newConfig: OutputConfig) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ layers: newLayers, config: newConfig });
      if (newHistory.length > 30) newHistory.shift(); 
      return newHistory;
    });
    setHistoryIndex(prev => {
      const newIdx = Math.min(prev + 1, 30);
      return (prev + 1 > 30) ? 30 : prev + 1;
    });
  }, [historyIndex]);

  const addToHistory = (newLayers: Layer[], newConfig: OutputConfig) => {
    setLayers(newLayers);
    setCanvasConfig(newConfig);
    saveHistory(newLayers, newConfig);
  };

  const handleUndo = () => {
    setHistoryIndex(prev => {
      if (prev > 0) {
        const newIndex = prev - 1;
        const state = history[newIndex];
        setLayers(state.layers);
        setCanvasConfig(state.config);
        return newIndex;
      }
      return prev;
    });
  };

  const handleReset = () => {
    if (confirm('确定要重置画布吗？所有图层将被清除。')) {
      const emptyLayers: Layer[] = [];
      const defaultConfig = INITIAL_CONFIG;
      addToHistory(emptyLayers, defaultConfig);
      setSelectedId(null);
      setView({ scale: INITIAL_ZOOM, x: 50, y: 50 });
    }
  };

  // --- Tree Helpers ---
  const findLayer = (nodes: Layer[], id: string): Layer | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findLayer(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentArray = (nodes: Layer[], id: string): { array: Layer[], index: number, parent: Layer | null } | null => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        return { array: nodes, index: i, parent: null };
      }
      if (nodes[i].children) {
        const res = findParentArray(nodes[i].children!, id);
        if (res) {
          // If found deep, the 'parent' is nodes[i]
          return { ...res, parent: res.parent || nodes[i] };
        }
      }
    }
    return null;
  };

  // Flatten logic for Rendering (Bottom Layer -> Top Layer)
  // Sidebar List Order: Top -> Bottom. Top is Background (Index 0).
  const getAllLayersFlat = (nodes: Layer[], parentVisible = true, parentLocked = false): { layer: Layer, locked: boolean, visible: boolean }[] => {
    let list: { layer: Layer, locked: boolean, visible: boolean }[] = [];
    for (const node of nodes) {
      const isVisible = parentVisible && node.visible;
      const isLocked = parentLocked || node.locked;
      
      if (node.type === 'group' && node.children) {
         // Should we render group container? No, just children.
         // Recursively get children
         list = list.concat(getAllLayersFlat(node.children, isVisible, isLocked));
      } else if (node.type === 'image') {
         list.push({ layer: node, locked: isLocked, visible: isVisible });
      }
    }
    return list;
  };

  // Helper to collect all descendant IDs of a group (for moving/locking)
  const getDescendantImageIds = (layer: Layer): string[] => {
    if (layer.type === 'image') return [layer.id];
    let ids: string[] = [];
    if (layer.children) {
      for (const child of layer.children) {
        ids = ids.concat(getDescendantImageIds(child));
      }
    }
    return ids;
  };

  const updateLayerInTree = (nodes: Layer[], id: string, updater: (l: Layer) => Layer): Layer[] => {
    return nodes.map(node => {
      if (node.id === id) {
        return updater(node);
      }
      if (node.children) {
        return { ...node, children: updateLayerInTree(node.children, id, updater) };
      }
      return node;
    });
  };

  const deleteLayerInTree = (nodes: Layer[], id: string): Layer[] => {
    return nodes.filter(node => node.id !== id).map(node => {
      if (node.children) {
        return { ...node, children: deleteLayerInTree(node.children, id) };
      }
      return node;
    });
  };

  // --- Actions ---

  const handleAddGroup = () => {
    const newGroup: Layer = {
      id: generateId(),
      type: 'group',
      name: '新建组',
      visible: true,
      locked: false,
      expanded: true,
      width: 0, height: 0, x: 0, y: 0, opacity: 1, flipX: false, flipY: false,
      children: []
    };
    const newLayers = [...layers, newGroup]; // Add to root end
    addToHistory(newLayers, canvasConfig);
    setSelectedId(newGroup.id);
  };

  const addImages = useCallback(async (files: File[]) => {
    const readImage = (file: File): Promise<Layer> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        id: generateId(),
                        type: 'image',
                        name: file.name.replace(/\.(png|jpg|jpeg)$/i, ''),
                        src: e.target?.result as string,
                        img,
                        x: 0,
                        y: 0,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        visible: true,
                        locked: false,
                        opacity: 1,
                        flipX: false,
                        flipY: false,
                        children: [],
                        expanded: false
                    });
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const newLayerPromises = files.map(readImage);
    const newLayersData = await Promise.all(newLayerPromises);
    if (newLayersData.length === 0) return;

    const currentLayers = layersRef.current;
    let currentConfig = configRef.current;
    
    // Auto-resize
    if (currentLayers.length === 0) {
      currentConfig = { 
          width: newLayersData[0].width, 
          height: newLayersData[0].height 
      };
    }

    const processedNewLayers = newLayersData.map(l => ({
        ...l,
        x: (currentConfig.width - l.width) / 2,
        y: (currentConfig.height - l.height) / 2
    }));

    // Add to Root for simplicity, or add to selected group if possible?
    // Let's just add to root end (Top layer)
    const finalLayers = [...currentLayers, ...processedNewLayers];
    
    setLayers(finalLayers);
    setCanvasConfig(currentConfig);
    saveHistory(finalLayers, currentConfig);
    setSelectedId(processedNewLayers[processedNewLayers.length - 1].id);

  }, [saveHistory]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(f => f.type.includes('image'));
      addImages(files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (e: React.MouseEvent | null, id: string) => {
    if(e) e.stopPropagation();
    const newLayers = deleteLayerInTree(layers, id);
    addToHistory(newLayers, canvasConfig);
    if (selectedId === id) setSelectedId(null);
  };

  const handleToggleVisible = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newLayers = updateLayerInTree(layers, id, l => ({ ...l, visible: !l.visible }));
    addToHistory(newLayers, canvasConfig);
  };

  const handleToggleLock = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newLayers = updateLayerInTree(layers, id, l => ({ ...l, locked: !l.locked }));
    addToHistory(newLayers, canvasConfig);
  };

  const handleToggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Don't save history for UI expansion
    setLayers(updateLayerInTree(layers, id, l => ({ ...l, expanded: !l.expanded })));
  };

  const handleUpdateLayer = (id: string, updates: Partial<Layer>) => {
    // If updating a group (e.g. opacity), should we update children?
    // For visual simplicity, if we update opacity of a group, we might want to update all children.
    // But currently UI sliders bind to the selected object.
    
    // Special handling for Group simultaneous edit
    const target = findLayer(layers, id);
    if (!target) return;

    let newLayers = [...layers];

    if (target.type === 'group' && updates.opacity !== undefined) {
       // Update all children recursively
       const updateOpacity = (nodes: Layer[]): Layer[] => {
          return nodes.map(n => {
             if (n.type === 'image') return { ...n, opacity: updates.opacity! };
             if (n.children) return { ...n, opacity: updates.opacity!, children: updateOpacity(n.children) };
             return { ...n, opacity: updates.opacity! };
          });
       };
       // But wait, updateLayerInTree only updates the target node.
       // We need a specific logic.
       newLayers = updateLayerInTree(newLayers, id, l => {
          const updatedGroup = { ...l, ...updates };
          if (updatedGroup.children) updatedGroup.children = updateOpacity(updatedGroup.children);
          return updatedGroup;
       });
    } else {
       newLayers = updateLayerInTree(layers, id, l => ({ ...l, ...updates }));
    }

    addToHistory(newLayers, canvasConfig);
  };

  const handleDuplicate = (id: string) => {
    const layer = findLayer(layers, id);
    if(!layer) return;

    const cloneRecursive = (l: Layer): Layer => ({
        ...l,
        id: generateId(),
        name: l.name + ' (副本)',
        children: l.children ? l.children.map(cloneRecursive) : [],
        x: l.x + 20,
        y: l.y + 20
    });

    const newLayer = cloneRecursive(layer);
    
    // Insert after original
    // This requires finding parent array and splicing
    // Simplification: append to root
    const newLayers = [...layers, newLayer];
    addToHistory(newLayers, canvasConfig);
    setSelectedId(newLayer.id);
  };

  const handleCenter = (id: string) => {
    const layer = findLayer(layers, id);
    if(!layer) return;
    
    if (layer.type === 'group') {
        // Find bounding box of group
        const descendants = getAllLayersFlat(layer.children || []);
        if (descendants.length === 0) return;
        
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        descendants.forEach(({layer}) => {
            minX = Math.min(minX, layer.x);
            minY = Math.min(minY, layer.y);
            maxX = Math.max(maxX, layer.x + layer.width);
            maxY = Math.max(maxY, layer.y + layer.height);
        });
        const w = maxX - minX;
        const h = maxY - minY;
        const targetX = (canvasConfig.width - w) / 2;
        const targetY = (canvasConfig.height - h) / 2;
        const dx = targetX - minX;
        const dy = targetY - minY;

        // Move all children
        const moveRecursive = (nodes: Layer[]): Layer[] => {
            return nodes.map(n => {
                let newNode = { ...n };
                if (n.type === 'image') {
                    newNode.x += dx;
                    newNode.y += dy;
                }
                if (n.children) newNode.children = moveRecursive(n.children);
                return newNode;
            });
        };
        
        const newLayers = updateLayerInTree(layers, id, l => {
            return { ...l, children: moveRecursive(l.children || []) };
        });
        addToHistory(newLayers, canvasConfig);

    } else {
        const newX = (canvasConfig.width - layer.width) / 2;
        const newY = (canvasConfig.height - layer.height) / 2;
        handleUpdateLayer(id, { x: newX, y: newY });
    }
  };

  const handleReorder = (id: string, action: 'up' | 'down' | 'top' | 'bottom') => {
      // Find parent array
      const res = findParentArray(layers, id);
      if (!res) return;
      
      const { array, index, parent } = res;
      // Copy the array that needs modification
      const newArray = [...array];
      const item = newArray.splice(index, 1)[0];
      
      if (action === 'bottom') newArray.unshift(item);
      else if (action === 'top') newArray.push(item);
      else if (action === 'down') {
          if (index === 0) newArray.unshift(item);
          else newArray.splice(index - 1, 0, item);
      } else if (action === 'up') {
          if (index >= array.length) newArray.push(item);
          else newArray.splice(index + 1, 0, item);
      }
      
      // Now reconstruction the tree with the modified array
      let newLayers = [...layers];
      if (!parent) {
          // Root array changed
          newLayers = newArray;
      } else {
          // Sub array changed, find parent and update its children
          newLayers = updateLayerInTree(layers, parent.id, l => ({ ...l, children: newArray }));
      }
      
      addToHistory(newLayers, canvasConfig);
  };

  // --- Layer Sort Drag & Drop (Sidebar) ---
  const handleLayerDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/x-layer-id", id);
    e.stopPropagation();
  };

  const handleLayerDragOver = (e: React.DragEvent, id: string, type: LayerType) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    
    // Logic: 
    // If target is Group: Top 25% = Before, Bottom 25% = After, Middle 50% = Inside
    // If target is Image: Top 50% = Before, Bottom 50% = After
    
    if (type === 'group') {
        if (offsetY < rect.height * 0.25) setDragPosition('after'); // Visual "Up" in list is lower index (Background), so "Before"
        // Wait, visual list Top is index 0. 
        // Dropping "Above" visually means inserting at index i.
        // Dropping "Below" visually means inserting at index i+1.
        // My previous logic: Index 0 is Background.
        // Sidebar renders: Index 0 at Top.
        // So dropping at Top means becoming background.
        else if (offsetY > rect.height * 0.75) setDragPosition('after'); 
        else setDragPosition('inside');
    } else {
        setDragPosition('inside'); // Default just highlight for now, implementing generic sort is hard
    }
    setDragOverId(id);
  };

  const handleLayerDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const sourceId = e.dataTransfer.getData("application/x-layer-id");
    if (!sourceId || sourceId === targetId) return;

    // Move Logic
    // 1. Remove source from old location
    // 2. Add to new location
    
    // This is complex for deep trees. 
    // Simplification: Always drop INTO a group if dropped on center, or AFTER if dropped on image.
    
    const sourceRes = findParentArray(layers, sourceId);
    if (!sourceRes) return;
    
    // Prevent dragging parent into child
    const targetLayer = findLayer(layers, targetId);
    if (targetLayer) {
       const isDescendant = (parent: Layer, childId: string): boolean => {
           if (parent.children) {
               return parent.children.some(c => c.id === childId || isDescendant(c, childId));
           }
           return false;
       }
       // If source contains target, abort
       const sourceLayer = sourceRes.array[sourceRes.index];
       if (sourceLayer.type === 'group' && isDescendant(sourceLayer, targetId)) return;
    }

    let newLayers = JSON.parse(JSON.stringify(layers)); // Deep clone for safety
    
    // Delete Source
    const deleteRecursive = (nodes: Layer[]): Layer[] => {
       return nodes.filter(n => n.id !== sourceId).map(n => {
           if (n.children) n.children = deleteRecursive(n.children);
           return n;
       });
    }
    newLayers = deleteRecursive(newLayers);
    
    const sourceItem = sourceRes.array[sourceRes.index];
    
    // Insert Target
    const insertRecursive = (nodes: Layer[]): Layer[] => {
       return nodes.map(n => {
           if (n.id === targetId) {
               if (n.type === 'group') {
                   // Insert inside (append to children)
                   return { ...n, children: [...(n.children || []), sourceItem], expanded: true };
               } else {
                   // Insert after (not supported easily in map, need flat splice logic)
                   return n; 
               }
           }
           if (n.children) {
               // Check if target is in children list for 'Image' sibling insertion
               const idx = n.children.findIndex(c => c.id === targetId);
               if (idx !== -1 && n.children[idx].type !== 'group') {
                   // Insert after target
                   const newChildren = [...n.children];
                   newChildren.splice(idx + 1, 0, sourceItem);
                   return { ...n, children: newChildren };
               }
               return { ...n, children: insertRecursive(n.children) };
           }
           return n;
       });
    }
    
    // Special check if root contains target image
    const rootIdx = newLayers.findIndex((l:Layer) => l.id === targetId);
    if (rootIdx !== -1 && newLayers[rootIdx].type !== 'group') {
        newLayers.splice(rootIdx + 1, 0, sourceItem);
    } else {
        newLayers = insertRecursive(newLayers);
    }

    addToHistory(newLayers, canvasConfig);
    setDragOverId(null);
    setDragPosition(null);
  };

  // --- Canvas Interaction ---

  const getBoundingBox = (layerId: string): { x: number, y: number, w: number, h: number } | null => {
      const layer = findLayer(layers, layerId);
      if (!layer) return null;
      if (layer.type === 'image') return { x: layer.x, y: layer.y, w: layer.width, h: layer.height };
      
      // Group
      const descendants = getAllLayersFlat(layer.children || []);
      if (descendants.length === 0) return { x: 0, y: 0, w: 0, h: 0 }; // Should be null?
      
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      let hasVisible = false;
      descendants.forEach(({layer}) => {
          if (!layer.visible) return; // Ignore invisible for bbox?
          hasVisible = true;
          minX = Math.min(minX, layer.x);
          minY = Math.min(minY, layer.y);
          maxX = Math.max(maxX, layer.x + layer.width);
          maxY = Math.max(maxY, layer.y + layer.height);
      });
      
      if (!hasVisible) return null;
      return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  };

  const getMousePos = (e: React.MouseEvent | MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const screenToWorld = (sx: number, sy: number) => {
    return {
      x: (sx - view.x) / view.scale,
      y: (sy - view.y) / view.scale
    };
  };

  const hitTest = (wx: number, wy: number): { type: 'bg' | 'image' | 'handle', id?: string, handle?: string } => {
    if (selectedId) {
      const bbox = getBoundingBox(selectedId);
      const l = findLayer(layers, selectedId);
      
      if (bbox && l && !l.locked && l.visible) {
        // Group handles? Only for images for now, resizing groups is complex
        if (l.type === 'image') {
            const hw = 10 / view.scale; 
            const handles = [
                { name: 'tl', x: bbox.x, y: bbox.y },
                { name: 'tm', x: bbox.x + bbox.w / 2, y: bbox.y },
                { name: 'tr', x: bbox.x + bbox.w, y: bbox.y },
                { name: 'lm', x: bbox.x, y: bbox.y + bbox.h / 2 },
                { name: 'rm', x: bbox.x + bbox.w, y: bbox.y + bbox.h / 2 },
                { name: 'bl', x: bbox.x, y: bbox.y + bbox.h },
                { name: 'bm', x: bbox.x + bbox.w / 2, y: bbox.y + bbox.h },
                { name: 'br', x: bbox.x + bbox.w, y: bbox.y + bbox.h },
            ];
            for (const h of handles) {
              if (wx >= h.x - hw && wx <= h.x + hw && wy >= h.y - hw && wy <= h.y + hw) {
                return { type: 'handle', id: l.id, handle: h.name };
              }
            }
        }
      }
    }

    // Reverse check for selection
    // Get flat render list
    const flat = getAllLayersFlat(layers);
    // Iterate reverse
    for (let i = flat.length - 1; i >= 0; i--) {
      const { layer, visible, locked } = flat[i];
      if (!visible) continue;
      // Note: Groups themselves are not in flat list of images.
      // But if we click an image, we select that image.
      // If user wants to select group, they use Sidebar.
      if (wx >= layer.x && wx <= layer.x + layer.width && wy >= layer.y && wy <= layer.y + layer.height) {
        return { type: 'image', id: layer.id };
      }
    }

    return { type: 'bg' };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const { x: mx, y: my } = getMousePos(e);
    const { x: wx, y: wy } = screenToWorld(mx, my);
    
    if (e.button === 1 || (e.button === 0 && isSpacePressed.current)) {
      dragRef.current = {
        isDragging: true,
        mode: 'pan',
        handle: null,
        startX: mx,
        startY: my,
        itemsStart: [],
        viewStart: { ...view },
        id: null,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
      return;
    }

    const hit = hitTest(wx, wy);

    if (hit.type === 'handle' && hit.id) {
      const l = findLayer(layers, hit.id)!;
      dragRef.current = {
        isDragging: true,
        mode: 'resize',
        handle: hit.handle!,
        startX: mx, 
        startY: my,
        itemsStart: [{ id: l.id, x: l.x, y: l.y, w: l.width, h: l.height }],
        viewStart: { ...view },
        id: hit.id,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = getCursorForHandle(hit.handle!);
    } else if (hit.type === 'image' && hit.id) {
      // Logic: If current selected is a group, and clicked image is inside that group, Keep group selected?
      // No, usually direct click drills down.
      // Exception: Ctrl+Click? 
      // Let's stick to simple: Click = Select Layer. To select Group, use sidebar.
      
      // But wait, if I have a group selected, and I drag inside it, I want to move the group.
      let targetId = hit.id;
      
      // If we already selected a group, and the hit image is a descendant of that group, use the group ID
      if (selectedId) {
          const selectedLayer = findLayer(layers, selectedId);
          if (selectedLayer && selectedLayer.type === 'group') {
              const descendants = getDescendantImageIds(selectedLayer);
              if (descendants.includes(hit.id)) {
                  targetId = selectedId;
              }
          }
      }

      setSelectedId(targetId);
      const l = findLayer(layers, targetId)!;
      
      if (l.locked) {
          // Locked logic...
          return;
      }

      // Prepare for Move: Collect all affected layers
      let itemsToMove: any[] = [];
      if (l.type === 'group') {
          // Flatten all children images
          const descendants = getAllLayersFlat(l.children || []);
          itemsToMove = descendants.map(d => ({ 
              id: d.layer.id, x: d.layer.x, y: d.layer.y, w: d.layer.width, h: d.layer.height 
          }));
      } else {
          itemsToMove = [{ id: l.id, x: l.x, y: l.y, w: l.width, h: l.height }];
      }

      dragRef.current = {
        isDragging: true,
        mode: 'move',
        handle: null,
        startX: mx,
        startY: my,
        itemsStart: itemsToMove,
        viewStart: { ...view },
        id: targetId,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = 'move';
    } else {
      setSelectedId(null);
      dragRef.current = {
        isDragging: true,
        mode: 'pan', 
        handle: null,
        startX: mx,
        startY: my,
        itemsStart: [],
        viewStart: { ...view },
        id: null,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current.isDragging) {
       if (!canvasRef.current) return;
       const { x: mx, y: my } = getMousePos(e);
       const { x: wx, y: wy } = screenToWorld(mx, my);
       
       if (isSpacePressed.current) {
         canvasRef.current.style.cursor = 'grab';
         return;
       }

       const hit = hitTest(wx, wy);
       if (hit.type === 'handle' && hit.handle) {
         canvasRef.current.style.cursor = getCursorForHandle(hit.handle);
       } else if (hit.type === 'image') {
          // Check if parent locked?
          canvasRef.current.style.cursor = 'move';
       } else {
         canvasRef.current.style.cursor = 'default';
       }
       return;
    }

    dragRef.current.hasMoved = true;
    const { x: mx, y: my } = getMousePos(e);
    const dx = (mx - dragRef.current.startX);
    const dy = (my - dragRef.current.startY);
    const { mode, itemsStart, viewStart, id, handle } = dragRef.current;

    if (mode === 'pan') {
      setView({
        ...view,
        x: viewStart.x + dx,
        y: viewStart.y + dy
      });
    } else if (mode === 'move' && id && itemsStart.length > 0) {
      const wdx = dx / view.scale;
      const wdy = dy / view.scale;
      
      // Batch update all moved items
      // We need to apply updates to the state
      // This is tricky with the recursive state update.
      // We can iterate the flat list of IDs we have in `itemsStart` and update them.
      
      const movedIds = itemsStart.map(i => i.id);
      
      // Calculate snap only for the first item (primary) or bounding box?
      // Simple: Snap first item
      let snapDx = wdx;
      let snapDy = wdy;
      
      // Snap Logic (Only if single item or group leader?)
      // For simplicity, skip complex group snapping for now, or just snap the first one
      if (itemsStart.length === 1) {
          // ... existing snap logic ...
          const item = itemsStart[0];
          let newX = item.x + wdx;
          let newY = item.y + wdy;
          const cw = canvasConfig.width;
          const ch = canvasConfig.height;
          const threshold = 10 / view.scale;
          const snapsX: number[] = [];
          const snapsY: number[] = [];

          if (Math.abs(newX) < threshold) { newX = 0; snapsX.push(0); }
          else if (Math.abs((newX + item.w) - cw) < threshold) { newX = cw - item.w; snapsX.push(cw); }
          else if (Math.abs((newX + item.w/2) - cw/2) < threshold) { newX = cw/2 - item.w/2; snapsX.push(cw/2); }
          
          if (Math.abs(newY) < threshold) { newY = 0; snapsY.push(0); }
          else if (Math.abs((newY + item.h) - ch) < threshold) { newY = ch - item.h; snapsY.push(ch); }
          else if (Math.abs((newY + item.h/2) - ch/2) < threshold) { newY = ch/2 - item.h/2; snapsY.push(ch/2); }
          
          setSnapLines({ x: snapsX, y: snapsY });
          snapDx = newX - item.x;
          snapDy = newY - item.y;
      }

      // Update State
      // We need a function that updates multiple IDs at once
      const updateRecursive = (nodes: Layer[]): Layer[] => {
          return nodes.map(node => {
             const startState = itemsStart.find(i => i.id === node.id);
             let newNode = { ...node };
             
             if (startState) {
                 newNode.x = startState.x + snapDx;
                 newNode.y = startState.y + snapDy;
             }
             
             if (node.children) {
                 newNode.children = updateRecursive(node.children);
             }
             return newNode;
          });
      };
      setLayers(prev => updateRecursive(prev));

    } else if (mode === 'resize' && id && handle && itemsStart.length === 1) {
      // Resize only supports single image currently
      const itemStart = itemsStart[0];
      const wdx = dx / view.scale;
      const wdy = dy / view.scale;
      
      // ... existing resize logic ...
      let nx = itemStart.x;
      let ny = itemStart.y;
      let nw = itemStart.w;
      let nh = itemStart.h;

      const cw = canvasConfig.width;
      const ch = canvasConfig.height;
      const threshold = 10 / view.scale;
      const snapsX: number[] = [];
      const snapsY: number[] = [];

      let targetLeft = nx + (handle.includes('l') ? wdx : 0);
      let targetRight = nx + nw + (handle.includes('r') ? wdx : 0);
      let targetTop = ny + (handle.includes('t') ? wdy : 0);
      let targetBottom = ny + nh + (handle.includes('b') ? wdy : 0);

      if (handle.includes('l')) {
          if (Math.abs(targetLeft) < threshold) { targetLeft = 0; snapsX.push(0); }
          else if (Math.abs(targetLeft - cw) < threshold) { targetLeft = cw; snapsX.push(cw); }
      }
      if (handle.includes('r')) {
          if (Math.abs(targetRight - cw) < threshold) { targetRight = cw; snapsX.push(cw); }
          else if (Math.abs(targetRight) < threshold) { targetRight = 0; snapsX.push(0); }
      }
      if (handle.includes('t')) {
          if (Math.abs(targetTop) < threshold) { targetTop = 0; snapsY.push(0); }
          else if (Math.abs(targetTop - ch) < threshold) { targetTop = ch; snapsY.push(ch); }
      }
      if (handle.includes('b')) {
          if (Math.abs(targetBottom - ch) < threshold) { targetBottom = ch; snapsY.push(ch); }
          else if (Math.abs(targetBottom) < threshold) { targetBottom = 0; snapsY.push(0); }
      }

      setSnapLines({ x: snapsX, y: snapsY });

      if (handle.includes('l')) { nx = targetLeft; nw = (itemStart.x + itemStart.w) - targetLeft; }
      if (handle.includes('r')) { nw = targetRight - itemStart.x; }
      if (handle.includes('t')) { ny = targetTop; nh = (itemStart.y + itemStart.h) - targetTop; }
      if (handle.includes('b')) { nh = targetBottom - itemStart.y; }

      if (nw < 10) nw = 10;
      if (nh < 10) nh = 10;

      // Update single ID
      const updateRecursive = (nodes: Layer[]): Layer[] => {
          return nodes.map(node => {
             if (node.id === id) {
                 return { ...node, x: nx, y: ny, width: nw, height: nh };
             }
             if (node.children) {
                 return { ...node, children: updateRecursive(node.children) };
             }
             return node;
          });
      };
      setLayers(prev => updateRecursive(prev));
    }
  }, [view, canvasConfig]); 

  const onMouseUp = useCallback(() => {
    setSnapLines({ x: [], y: [] }); 
    if (dragRef.current.isDragging) {
      const { mode, hasMoved } = dragRef.current;
      dragRef.current.isDragging = false;
      
      if (hasMoved && (mode === 'move' || mode === 'resize')) {
        saveHistory(layers, canvasConfig);
      }
      if (canvasRef.current) canvasRef.current.style.cursor = 'default';
    }
  }, [layers, canvasConfig, saveHistory]);

  const changeZoom = (delta: number) => {
    setView(v => {
      const raw = v.scale + delta;
      const rounded = Math.round(raw * 10) / 10;
      return {...v, scale: Math.max(0.1, Math.min(5, rounded))};
    });
  }

  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomSensitivity = 0.001; 
      const newScale = Math.max(0.1, Math.min(5, view.scale - e.deltaY * zoomSensitivity));
      setView(v => ({ ...v, scale: newScale }));
    } else {
      setView(v => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // --- Rendering ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(view.x, view.y);
    ctx.scale(view.scale, view.scale);

    // Canvas Background
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(0, 0, canvasConfig.width, canvasConfig.height);
    ctx.shadowColor = 'transparent'; 
    
    // Grid
    const gridSize = 20;
    ctx.fillStyle = '#f0f0f0';
    for(let y=0; y<canvasConfig.height; y+=gridSize) {
      for(let x=0; x<canvasConfig.width; x+=gridSize) {
        if ((x/gridSize + y/gridSize) % 2 === 0) {
          ctx.fillRect(x, Math.min(y, canvasConfig.height), Math.min(gridSize, canvasConfig.width-x), Math.min(gridSize, canvasConfig.height-y));
        }
      }
    }

    // Layers
    // We used getAllLayersFlat (Background -> Foreground)
    const renderList = getAllLayersFlat(layers);
    
    renderList.forEach(({layer, visible, locked}) => {
      if (!visible) return;
      ctx.save();
      ctx.globalAlpha = layer.opacity;
      const centerX = layer.x + layer.width / 2;
      const centerY = layer.y + layer.height / 2;
      ctx.translate(centerX, centerY);
      ctx.scale(layer.flipX ? -1 : 1, layer.flipY ? -1 : 1);
      if (layer.img) {
          ctx.drawImage(layer.img, -layer.width / 2, -layer.height / 2, layer.width, layer.height);
      }
      ctx.restore();
    });

    // Snap Lines
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 1 / view.scale;
    ctx.beginPath();
    snapLines.x.forEach(x => { ctx.moveTo(x, 0); ctx.lineTo(x, canvasConfig.height); });
    snapLines.y.forEach(y => { ctx.moveTo(0, y); ctx.lineTo(canvasConfig.width, y); });
    ctx.stroke();

    // Selection Overlay
    if (selectedId) {
      const bbox = getBoundingBox(selectedId);
      const l = findLayer(layers, selectedId);
      
      if (bbox && l && l.visible) {
        ctx.strokeStyle = l.locked ? '#ff4d4f' : '#1890ff';
        ctx.lineWidth = 2 / view.scale;
        
        if (l.locked) ctx.setLineDash([5, 5]);
        ctx.strokeRect(bbox.x, bbox.y, bbox.w, bbox.h);
        ctx.setLineDash([]);
        
        // Center mark
        ctx.beginPath();
        ctx.moveTo(bbox.x + bbox.w/2 - 5/view.scale, bbox.y + bbox.h/2);
        ctx.lineTo(bbox.x + bbox.w/2 + 5/view.scale, bbox.y + bbox.h/2);
        ctx.moveTo(bbox.x + bbox.w/2, bbox.y + bbox.h/2 - 5/view.scale);
        ctx.lineTo(bbox.x + bbox.w/2, bbox.y + bbox.h/2 + 5/view.scale);
        ctx.stroke();

        if (!l.locked && l.type === 'image') {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#1890ff'; 
            const handleSize = 8 / view.scale;
            
            const handles = [
                { x: bbox.x, y: bbox.y },
                { x: bbox.x + bbox.w/2, y: bbox.y },
                { x: bbox.x + bbox.w, y: bbox.y },
                { x: bbox.x + bbox.w, y: bbox.y + bbox.h/2 },
                { x: bbox.x + bbox.w, y: bbox.y + bbox.h },
                { x: bbox.x + bbox.w/2, y: bbox.y + bbox.h },
                { x: bbox.x, y: bbox.y + bbox.h },
                { x: bbox.x, y: bbox.y + bbox.h/2 },
            ];

            handles.forEach(({x, y}) => {
              ctx.beginPath();
              ctx.rect(x - handleSize/2, y - handleSize/2, handleSize, handleSize);
              ctx.fill();
              ctx.stroke();
            });
        }
      }
    }

  }, [layers, view, selectedId, canvasConfig, containerSize, snapLines]);

  // --- Export ---
  const handleExport = () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasConfig.width;
    tempCanvas.height = canvasConfig.height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    const renderList = getAllLayersFlat(layers);
    renderList.forEach(({layer, visible}) => {
      if (!visible) return;
      ctx.save();
      ctx.globalAlpha = layer.opacity;
      const centerX = layer.x + layer.width / 2;
      const centerY = layer.y + layer.height / 2;
      ctx.translate(centerX, centerY);
      ctx.scale(layer.flipX ? -1 : 1, layer.flipY ? -1 : 1);
      if(layer.img) ctx.drawImage(layer.img, -layer.width / 2, -layer.height / 2, layer.width, layer.height);
      ctx.restore();
    });

    const link = document.createElement('a');
    link.download = `composition-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const onGlobalDragOver = (e: React.DragEvent) => e.preventDefault();
  const onGlobalDrop = (e: React.DragEvent) => e.preventDefault();

  const handleButtonDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('Files')) {
      e.preventDefault();
      e.stopPropagation();
      setIsButtonDragOver(true);
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleButtonDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonDragOver(false);
  };

  const handleButtonDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.includes('image'));
      if(files.length > 0) addImages(files);
    }
  };

  const selectedLayer = findLayer(layers, selectedId || '');
  
  // Recursive Layer Component
  const LayerTreeItem = ({ layer, depth }: { layer: Layer, depth: number }) => {
      return (
          <div className="layer-item-wrapper">
              <div 
                  className={`layer-item ${selectedId === layer.id ? 'selected' : ''} ${dragOverId === layer.id ? (dragPosition === 'inside' ? 'drag-target-in' : 'drag-target-over') : ''}`}
                  onClick={() => setSelectedId(layer.id)}
                  draggable
                  onDragStart={(e) => handleLayerDragStart(e, layer.id)}
                  onDragOver={(e) => handleLayerDragOver(e, layer.id, layer.type)}
                  onDrop={(e) => handleLayerDrop(e, layer.id)}
              >
                  {depth > 0 && <div className="layer-indent" style={{ width: depth * 16 }}></div>}
                  
                  {layer.type === 'group' ? (
                      <div className="layer-expand-btn" onClick={(e) => handleToggleExpand(e, layer.id)}>
                          {layer.expanded ? <IconChevronDown /> : <IconChevronRight />}
                      </div>
                  ) : (
                      <div style={{ width: 24 }}></div>
                  )}

                  {layer.type === 'group' ? (
                      <div className="layer-icon">
                          {layer.expanded ? <IconFolderOpen /> : <IconFolder />}
                      </div>
                  ) : (
                      <img src={layer.src} className="layer-thumb" alt="" />
                  )}

                  <div className="layer-info">
                      <div className="layer-name">{layer.name}</div>
                      {layer.locked && <div className="layer-meta" style={{color: '#ff4d4f'}}>已锁定</div>}
                  </div>
                  
                  <div className="layer-actions">
                    <button 
                      className="icon-btn" 
                      title={layer.locked ? "解锁" : "锁定"}
                      onClick={(e) => handleToggleLock(e, layer.id)}
                    >
                      {layer.locked ? <IconLock /> : <IconUnlock />}
                    </button>
                    <button 
                      className="icon-btn" 
                      title={layer.visible ? "隐藏" : "显示"}
                      onClick={(e) => handleToggleVisible(e, layer.id)}
                    >
                      {layer.visible ? <IconEye /> : <IconEyeOff />}
                    </button>
                    <button 
                      className="icon-btn delete" 
                      title="删除"
                      onClick={(e) => handleDelete(e, layer.id)}
                    >
                      <IconTrash />
                    </button>
                  </div>
              </div>
              {layer.type === 'group' && layer.expanded && layer.children && (
                  <div className="layer-children">
                      {layer.children.map(child => (
                          <LayerTreeItem key={child.id} layer={child} depth={depth + 1} />
                      ))}
                  </div>
              )}
          </div>
      );
  };

  return (
    <>
      <style>{styles}</style>
      <div 
        className="app-container" 
        onDragOver={onGlobalDragOver} 
        onDrop={onGlobalDrop} 
      >
        
        {/* Header */}
        <header className="header">
          <div className="logo">
            <span>PNG 合成工具</span>
          </div>

          <div className="header-center">
             {selectedId && selectedLayer ? (
               <div className="edit-toolbar" onMouseDown={e => e.stopPropagation()}>
                <div className="edit-section">
                   <span className="edit-label">透明度</span>
                   <div className="slider-control">
                     <input 
                       type="range" 
                       min="0" 
                       max="1" 
                       step="0.01" 
                       value={selectedLayer.opacity} 
                       onChange={(e) => handleUpdateLayer(selectedId!, { opacity: parseFloat(e.target.value) })}
                     />
                     <span style={{fontSize: 12, width: 24}}>{Math.round(selectedLayer.opacity * 100)}%</span>
                   </div>
                </div>
                <div className="edit-section">
                  <span className="edit-label">变换</span>
                  <button className="icon-btn" title="水平翻转" onClick={() => handleUpdateLayer(selectedId!, { flipX: !selectedLayer.flipX })}><IconFlipH /></button>
                  <button className="icon-btn" title="垂直翻转" onClick={() => handleUpdateLayer(selectedId!, { flipY: !selectedLayer.flipY })}><IconFlipV /></button>
                  <button className="icon-btn" title="居中" onClick={() => handleCenter(selectedId!)}><IconCenter /></button>
                </div>
                <div className="edit-section">
                   <span className="edit-label">层级</span>
                   <button className="icon-btn" title="置顶" onClick={() => handleReorder(selectedId!, 'top')}><IconChevronsUp /></button>
                   <button className="icon-btn" title="上移" onClick={() => handleReorder(selectedId!, 'up')}><IconArrowUp /></button>
                   <button className="icon-btn" title="下移" onClick={() => handleReorder(selectedId!, 'down')}><IconArrowDown /></button>
                   <button className="icon-btn" title="置底" onClick={() => handleReorder(selectedId!, 'bottom')}><IconChevronsDown /></button>
                </div>
                <div className="edit-section">
                   <button className="icon-btn" title="复制" onClick={() => handleDuplicate(selectedId!)}><IconCopy /></button>
                   <button className="icon-btn delete" title="删除 (Delete)" onClick={(e) => handleDelete(e, selectedId!)}><IconTrash /></button>
                </div>
              </div>
             ) : (
                 <div style={{color: '#ccc', fontSize: '13px', display: 'flex', alignItems: 'center'}}>
                     选中图片以编辑
                 </div>
             )}
          </div>

          <div className="actions">
             <button className="btn btn-secondary btn-danger-text" onClick={handleReset} title="清空所有图层">
              <IconRefresh /> 重置
            </button>
            <button className="btn btn-secondary" onClick={handleUndo} disabled={historyIndex <= 0} title="Ctrl+Z">
              <IconUndo /> 撤销
            </button>
            <div style={{ width: 1, height: 24, background: '#eee', margin: '0 4px' }}></div>
            <button 
                className={`btn btn-secondary ${isButtonDragOver ? 'drag-active' : ''}`} 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleButtonDragOver}
                onDragLeave={handleButtonDragLeave}
                onDrop={handleButtonDrop}
                title="点击选择或拖拽图片到此按钮"
            >
              <IconUpload /> 添加图片
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              accept="image/png,image/jpeg" 
              onChange={handleFileChange} 
            />
            <button className="btn btn-primary" onClick={handleExport}>
              <IconDownload /> 导出 PNG
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="workspace-wrapper">
          
          {/* Left Sidebar: Layers */}
          <div className="sidebar">
            <div className="sidebar-header">
              <span>图层</span>
              <button className="icon-btn" title="新建组" onClick={handleAddGroup}>
                  <IconFolderPlus />
              </button>
            </div>
            <div className="layer-list">
              {layers.length === 0 && (
                <div className="empty-layers">
                  <p>暂无图层</p>
                  <p>请点击“添加图片”或直接拖拽图片到上方按钮</p>
                </div>
              )}
              {layers.map((layer) => (
                  <LayerTreeItem key={layer.id} layer={layer} depth={0} />
              ))}
            </div>
          </div>

          {/* Center Canvas */}
          <div 
            className="canvas-container" 
            ref={containerRef}
            onMouseDown={onMouseDown}
            onWheel={onWheel}
          >
            
            <canvas 
              ref={canvasRef}
              width={containerSize.width}
              height={containerSize.height}
              style={{ display: 'block' }}
            />
            
            {/* Controls */}
            <div className="canvas-controls">
              <button className="icon-btn" onClick={() => changeZoom(-0.1)}><IconZoomOut /></button>
              <span className="zoom-val">{Math.round(view.scale * 100)}%</span>
              <button className="icon-btn" onClick={() => changeZoom(0.1)}><IconZoomIn /></button>
            </div>

            <div className="tooltip">
              提示：空格 + 拖拽可平移画布
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);