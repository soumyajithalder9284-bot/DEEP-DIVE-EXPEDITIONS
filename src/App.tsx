import { useEffect, useRef, useState } from 'react';
import { NavDrawer } from './components/NavDrawer';
import { HeroSection } from './components/HeroSection';
import { ExpeditionsSection } from './components/ExpeditionsSection';
import { TelemetryCalendarSection } from './components/TelemetryCalendarSection';
import { SafetyFleetSection } from './components/SafetyFleetSection';
import { EquipmentSection } from './components/EquipmentSection';
import { LogbookSection } from './components/LogbookSection';
import { InquiryFooterSection } from './components/InquiryFooterSection';
import { DetailModal } from './components/DetailModal';
import type { Expedition, LogbookEntry, ModalDetail } from './data/expeditions';

export default function App() {
  const [animationKey, setAnimationKey] = useState(0);
  const wasHiddenRef = useRef(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState<ModalDetail | null>(null);
  const [selectedExpedition, setSelectedExpedition] = useState('');
  const [attachedRigNotes, setAttachedRigNotes] = useState('');

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setAnimationKey((prev) => prev + 1);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        wasHiddenRef.current = true;
      } else if (
        document.visibilityState === 'visible' &&
        wasHiddenRef.current
      ) {
        wasHiddenRef.current = false;
        setAnimationKey((prev) => prev + 1);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleOpenExpeditionDossier = (exp: Expedition) => {
    setModalDetail({
      tag: exp.dossier.tag,
      title: exp.title,
      body: exp.dossier.body,
      meta: exp.dossier.meta,
    });
  };

  const handleInspectLog = (entry: LogbookEntry) => {
    setModalDetail({
      tag: `${entry.logNumber} · ${entry.gps}`,
      title: `${entry.title} (-${entry.depthMeters}m)`,
      body: entry.body,
      meta: entry.meta,
    });
  };

  const scrollToInquiries = () => {
    document.getElementById('inquiries')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReserveDeparture = (label: string) => {
    setSelectedExpedition(label);
    scrollToInquiries();
  };

  const handleAttachRig = (rigSummary: string) => {
    setAttachedRigNotes(rigSummary);
    scrollToInquiries();
  };

  return (
    <div className="min-h-screen bg-[#020813] text-white">
      <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <HeroSection
        animationKey={animationKey}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      <main>
        <ExpeditionsSection
          animationKey={animationKey}
          onSelectDossier={handleOpenExpeditionDossier}
        />

        <TelemetryCalendarSection
          animationKey={animationKey}
          onReserveDeparture={handleReserveDeparture}
        />

        <SafetyFleetSection animationKey={animationKey} />

        <EquipmentSection
          animationKey={animationKey}
          onAttachRig={handleAttachRig}
        />

        <LogbookSection
          animationKey={animationKey}
          onInspectLog={handleInspectLog}
        />

        <InquiryFooterSection
          animationKey={animationKey}
          selectedExpedition={selectedExpedition}
          attachedRigNotes={attachedRigNotes}
        />
      </main>

      <DetailModal
        detail={modalDetail}
        onClose={() => setModalDetail(null)}
      />
    </div>
  );
}
