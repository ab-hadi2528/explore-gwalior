import { useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { attractions } from '@/data/attractions.js';

export default function ReportIncorrectInformation() {
  const [attraction, setAttraction] = useState('');
  const [issue, setIssue] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-white border border-sandstone/25 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-3 mb-6">
        <div className="rounded-full bg-gold/15 p-3 text-gold">
          <AlertTriangle size={22} />
        </div>
        <div>
          <h2 className="text-[#1b2a4a] text-xl font-bold">Report incorrect information</h2>
          <p className="text-[#1b2a4a]/60 text-sm mt-1">
            Help us improve the dataset. This prototype does not send reports to a server yet.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-5">
          <p className="text-green-900 font-semibold">Report saved for this demo.</p>
          <p className="text-green-800 text-sm mt-1">
            No message was sent because this prototype has no backend connection yet.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-semibold text-green-900 underline"
          >
            Submit another report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-[#1b2a4a]">
            Attraction
            <select
              required
              value={attraction}
              onChange={(event) => setAttraction(event.target.value)}
              className="rounded-xl border border-sandstone/35 bg-cream px-4 py-3 font-normal outline-none focus:border-gold"
            >
              <option value="">Choose an attraction</option>
              {attractions.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1b2a4a]">
            What looks incorrect?
            <textarea
              required
              value={issue}
              onChange={(event) => setIssue(event.target.value)}
              rows={4}
              placeholder="Tell us which detail needs checking"
              className="rounded-xl border border-sandstone/35 bg-cream px-4 py-3 font-normal outline-none focus:border-gold resize-y"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1b2a4a]">
            Contact details <span className="font-normal text-[#1b2a4a]/50">(optional)</span>
            <input
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="Email or phone, if you would like a reply"
              className="rounded-xl border border-sandstone/35 bg-cream px-4 py-3 font-normal outline-none focus:border-gold"
            />
          </label>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b2a4a] px-5 py-3 text-sm font-semibold text-cream transition hover:bg-[#243760]">
            <Send size={16} />
            Save report
          </button>
        </form>
      )}
    </section>
  );
}
