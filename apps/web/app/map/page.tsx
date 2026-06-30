import { redirect } from 'next/navigation';

/** Backward-compatible redirect: the map is now reached via world selection. */
export default function MapPage() {
  redirect('/worlds');
}
