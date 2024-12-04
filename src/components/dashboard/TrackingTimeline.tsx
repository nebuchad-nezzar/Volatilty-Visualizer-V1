import React from 'react';
import { Clock, MapPin, Package, Truck, CheckCircle } from 'lucide-react';

interface TrackingEvent {
  date: string;
  location: string;
  status: string;
  description: string;
}

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  const getIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'picked up':
        return <Package className="h-5 w-5" />;
      case 'in transit':
        return <Truck className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={eventIdx}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                    {getIcon(event.status)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.description}{' '}
                      <span className="font-medium text-gray-900">
                        {event.location}
                      </span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.date}>
                      {new Date(event.date).toLocaleString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}