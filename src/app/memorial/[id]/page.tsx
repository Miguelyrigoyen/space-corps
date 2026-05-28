import { supabaseAdmin } from '@/lib/supabase'
import TrajectoryTracker from '@/components/memorial/TrajectoryTracker'
import { notFound } from 'next/navigation'
import type { Reservation } from '@/types'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props) {
  const { data } = await supabaseAdmin
    .from('reservations')
    .select('memorial_name')
    .eq('id', params.id)
    .single()
  return {
    title: data ? `${data.memorial_name} — Space Corps Memorial` : 'Memorial — Space Corps',
  }
}

export default async function MemorialPage({ params }: Props) {
  const { data: reservation } = await supabaseAdmin
    .from('reservations')
    .select('*')
    .eq('id', params.id)
    .single() as { data: Reservation | null }

  if (!reservation) notFound()

  const launchDate = reservation.launch_date
    ? new Date(reservation.launch_date).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      })
    : null

  const DESTINATION_LABELS: Record<string, string> = {
    'earth-orbit': 'Earth Orbit',
    'lunar': 'Lunar Trajectory',
    'heliocentric': 'Heliocentric Orbit',
    'deep-space': 'Deep Space',
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">In Memoriam</p>
          <h1
            className="text-5xl md:text-7xl font-light text-star mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {reservation.memorial_name}
          </h1>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-6 text-xs text-star/40 tracking-widest uppercase">
            {reservation.destination && (
              <span>{DESTINATION_LABELS[reservation.destination] ?? reservation.destination}</span>
            )}
            {launchDate && (
              <>
                <span>·</span>
                <span>Launched {launchDate}</span>
              </>
            )}
          </div>
        </div>

        {/* Photo */}
        {reservation.memorial_photo_url && (
          <div className="flex justify-center mb-12">
            <div className="relative w-40 h-40">
              <img
                src={reservation.memorial_photo_url}
                alt={reservation.memorial_name}
                className="w-full h-full object-cover rounded-full"
                style={{ border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 40px rgba(201,168,76,0.2)' }}
              />
            </div>
          </div>
        )}

        {/* Bio */}
        {reservation.memorial_bio && (
          <div className="glass-panel gold-border p-10 mb-12 text-center">
            <p
              className="text-star/70 text-lg leading-relaxed italic"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              "{reservation.memorial_bio}"
            </p>
          </div>
        )}

        {/* Mission details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Destination', value: DESTINATION_LABELS[reservation.destination ?? ''] ?? 'TBD' },
            { label: 'Preservation', value: reservation.preservation_type?.replace(/-/g, ' ') ?? 'TBD' },
            { label: 'Mission Status', value: reservation.status?.replace(/-/g, ' ') ?? 'TBD' },
            { label: 'Launch Date', value: launchDate ?? 'To Be Announced' },
          ].map(s => (
            <div key={s.label} className="glass-panel p-5 text-center">
              <p className="text-gold text-sm capitalize">{s.value}</p>
              <p className="text-star/30 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 3D Tracker */}
        <div className="glass-panel gold-border p-8 mb-12">
          <TrajectoryTracker
            trajectoryId={reservation.trajectory_id}
            destination={reservation.destination ?? undefined}
            memorialName={reservation.memorial_name}
          />
        </div>

        {/* Footer note */}
        <div className="text-center">
          <div className="divider-gold mb-8" />
          <p className="text-star/30 text-xs leading-relaxed max-w-lg mx-auto">
            This memorial page will remain online permanently, maintained by Space Corps
            as a tribute to {reservation.memorial_name} and their extraordinary final journey.
          </p>
          <p className="text-gold/40 text-xs mt-4 tracking-widest">SPACE CORPS · BEYOND EARTH</p>
        </div>
      </div>
    </div>
  )
}
