// app/app-viewer/[appId]/page.tsx
'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';

// Define the structure of the incoming browser Message Event data package
interface HubStateUpdateMessage {
  type: 'HUB_STATE_UPDATE';
  action: string;
  payload: Record<string, any>;
}

interface PageParams {
  params: Promise<{ appId: string }>;
}

export default function AppViewer({ params }: PageParams) {
  // Explicitly unwrap dynamic router parameters using React's use() hook
  const { appId } = use(params);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    // Strongly type the native browser message event
    const handleMessageFromApp = async (event: MessageEvent<HubStateUpdateMessage | any>) => {
      // Security Check: Only accept messages originating from your own domain
      if (event.origin !== window.location.origin) return;

      // Type-guard: Verify the shape of the data payload match our expected hub format
      if (event.data && event.data.type === 'HUB_STATE_UPDATE') {
        const { action, payload } = event.data;
        
        setNotification(`Received "${action}" event from the plugin!`);

        // Forward safely validated data over to our mock database tier
        await supabase.from('family_app_logs').insert({
          app_id: appId,
          action_type: action,
          data_payload: payload,
          timestamp: new Date().toISOString(),
        });

        setTimeout(() => setNotification(''), 4000);
      }
    };

    window.addEventListener('message', handleMessageFromApp);
    return () => window.removeEventListener('message', handleMessageFromApp);
  }, [appId]);

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between z-10">
        <Link href="/" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg transition-colors">
          ← Back to Hub
        </Link>
        <h1 className="text-lg font-mono text-gray-300">Running: <span className="text-yellow-400 font-bold">{appId}</span></h1>
        <div className="w-24"></div>
      </header>

      {notification && (
        <div className="absolute top-20 right-6 left-6 md:left-auto bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl font-medium animate-bounce z-50 text-center">
          {notification}
        </div>
      )}

      <div className="flex-1 w-full h-full relative bg-white">
        <iframe
          src={`/games/${appId}/index.html`}
          className="w-full h-full border-none"
          title={appId}
          allow="fullscreen; autoplay"
        />
      </div>
    </div>
  );
}
