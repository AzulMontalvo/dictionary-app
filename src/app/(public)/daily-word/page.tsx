import { termsApi } from '@/lib/api/terms';
import { redirect } from 'next/navigation';

export default async function DailyWordRedirectPage() {
  const dailyWord = await termsApi.getDailyWord();

  redirect(`/terms/${dailyWord.id}`);
}