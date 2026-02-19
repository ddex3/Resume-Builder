import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Download, RotateCcw, ZoomIn, ZoomOut, FileText, Languages, Pencil, Eye } from 'lucide-react';
import type { TemplateName } from './types';
import { useResumeState } from './hooks/useResumeState';
import { ResumeForm } from './components/form/ResumeForm';
import { ResumePreview } from './components/preview/ResumePreview';
import { TemplateSelector } from './components/TemplateSelector';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher';
import { exportToPDF } from './utils/exportPDF';
import { useLanguage } from './contexts/LanguageContext';
import { ConfirmDialog } from './components/ui/ConfirmDialog';

const TEMPLATE_STORAGE_KEY = 'resume-builder-template';

function loadTemplate(): TemplateName {
  try {
    const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (stored) return stored as TemplateName;
  } catch {
  }
  return 'pure-minimal';
}

const App: React.FC = () => {
  const { t, lang, setLang, isRTL } = useLanguage();
  const { data, dispatch, resetData } = useResumeState();
  const [template, setTemplate] = useState<TemplateName>(loadTemplate);
  const [exporting, setExporting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [zoom, setZoom] = useState(() => {
    if (window.innerWidth < 640) return 0.36;
    if (window.innerWidth < 1024) return 0.42;
    return 0.48;
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [contentHeightPx, setContentHeightPx] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setContentHeightPx(el.offsetHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaledHeight =
    contentHeightPx > 0
      ? `${contentHeightPx * zoom}px`
      : `calc(297mm * ${zoom})`;

  const handleTemplateChange = useCallback((t: TemplateName) => {
    setTemplate(t);
    localStorage.setItem(TEMPLATE_STORAGE_KEY, t);
  }, []);

  const handleExport = useCallback(async () => {
    setExporting(true);

    if (window.innerWidth < 1024 && activeView !== 'preview') {
      setActiveView('preview');
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    const container = previewRef.current;
    if (!container) {
      setExporting(false);
      return;
    }

    const prevTransform = container.style.transform;
    const prevHeight = container.style.height;
    container.style.transform = 'none';
    container.style.height = 'auto';

    try {
      const name = data.personal.fullName
        ? `${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      await exportToPDF(name);
    } finally {
      container.style.transform = prevTransform;
      container.style.height = prevHeight;
      setExporting(false);
    }
  }, [data.personal.fullName, activeView]);

  const handleReset = useCallback(() => {
    setShowResetConfirm(true);
  }, []);

  const handleConfirmReset = useCallback(() => {
    setShowResetConfirm(false);
    resetData();
  }, [resetData]);

  const handleCancelReset = useCallback(() => {
    setShowResetConfirm(false);
  }, []);

  const hasAnyData =
    Object.values(data.personal).some((v) => v.trim() !== '') ||
    data.summary.trim() !== '' ||
    data.skills.some((c) => c.skills.length > 0) ||
    data.experience.length > 0 ||
    data.projects.length > 0 ||
    data.certifications.length > 0 ||
    data.leadership.length > 0;

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 1));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.2));

  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden transition-colors duration-200" dir={isRTL ? 'rtl' : 'ltr'}>
      <ConfirmDialog
        isOpen={showResetConfirm}
        title={t.reset}
        message={t.confirmReset}
        confirmLabel={t.reset}
        cancelLabel={t.cancel}
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
      <header className="bg-surface border-b border-stroke px-3 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 z-10 transition-colors duration-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <FileText size={20} className="text-blue-600" />
            <h1 className="text-base sm:text-lg font-bold text-fg">{t.appTitle}</h1>
          </div>
          <span className="hidden sm:inline text-xs text-fg-subtle bg-tinted px-2 py-0.5 rounded-full">
            {t.autosaved}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeSwitcher />
          <button
            onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium border border-stroke rounded-lg text-fg-muted hover:border-blue-300 hover:text-blue-600 transition-colors"
            title={lang === 'en' ? 'עברית' : 'English'}
          >
            <Languages size={14} />
            <span className="hidden sm:inline">{lang === 'en' ? 'עברית' : 'English'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs text-fg-muted hover:text-red-500 border border-stroke rounded-lg hover:border-red-200 transition-colors"
            title={t.reset}
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">{t.reset}</span>
          </button>
          <button
            onClick={handleExport}
            disabled={exporting || !hasAnyData}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            title={exporting ? t.generating : t.exportPDF}
          >
            <Download size={14} />
            <span className="hidden sm:inline">{exporting ? t.generating : t.exportPDF}</span>
          </button>
        </div>
      </header>

      <div className="bg-surface border-b border-stroke-faint px-3 sm:px-6 py-2.5 flex-shrink-0 transition-colors duration-200">
        <TemplateSelector selected={template} onChange={handleTemplateChange} />
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div
          className={`bg-surface overflow-y-auto flex-col lg:w-[480px] lg:flex-shrink-0 lg:border-r lg:border-stroke lg:flex transition-colors duration-200 ${
            activeView === 'form' ? 'flex w-full' : 'hidden'
          }`}
        >
          <div className="p-4 sm:p-5 pb-16 lg:pb-8">
            <ResumeForm data={data} dispatch={dispatch} />
          </div>
        </div>

        <div
          className={`overflow-auto bg-tinted relative flex-col lg:flex-1 lg:flex transition-colors duration-200 ${
            activeView === 'preview' ? 'flex flex-1' : 'hidden'
          }`}
        >
          <div className="sticky top-0 right-0 z-10 flex justify-end p-2 sm:p-3 gap-1">
            <button
              onClick={zoomOut}
              className="p-1.5 bg-surface border border-stroke rounded-lg text-fg-muted hover:text-fg shadow-sm"
              title={t.zoomOut}
            >
              <ZoomOut size={16} />
            </button>
            <span className="flex items-center px-2 text-xs text-fg-muted bg-surface border border-stroke rounded-lg">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1.5 bg-surface border border-stroke rounded-lg text-fg-muted hover:text-fg shadow-sm"
              title={t.zoomIn}
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <div className="flex justify-center pb-16 lg:pb-12 px-3 sm:px-6">
            <div
              ref={previewRef}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                height: scaledHeight,
              }}
            >
              <div style={{ position: 'relative' }}>
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 10,
                    backgroundImage:
                      'repeating-linear-gradient(' +
                      'to bottom,' +
                      'transparent,' +
                      'transparent calc(297mm - 1px),' +
                      'rgba(99,102,241,0.35) calc(297mm - 1px),' +
                      'rgba(99,102,241,0.35) 297mm' +
                      ')',
                  }}
                />

                <div
                  ref={innerRef}
                  className="shadow-2xl"
                  style={{ width: '210mm', minHeight: '297mm' }}
                >
                  <ResumePreview data={data} template={template} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex-shrink-0 bg-surface border-t border-stroke flex z-20 mobile-tab-bar transition-colors duration-200">
        <button
          onClick={() => setActiveView('form')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeView === 'form'
              ? 'text-blue-600 border-t-2 border-blue-600 -mt-px'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          <Pencil size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => setActiveView('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeView === 'preview'
              ? 'text-blue-600 border-t-2 border-blue-600 -mt-px'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          <Eye size={16} />
          <span>Preview</span>
        </button>
      </div>
    </div>
  );
};

export default App;
