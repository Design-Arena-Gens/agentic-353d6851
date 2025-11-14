'use client';

import { useMemo, useState } from 'react';
import { generateAdConcept, type AdConcept, type AdInput, type ChannelOption, type ToneOption } from '../lib/creativeEngine';

const toneOptions: { value: ToneOption; label: string; description: string }[] = [
  { value: 'premium', label: 'Premium', description: 'Szlachetne drewno, ekskluzywne wykończenie.' },
  { value: 'rustic', label: 'Rustykalny', description: 'Naturalny charakter, ciepłe tekstury.' },
  { value: 'family', label: 'Rodzinny', description: 'Komfort i bezpieczeństwo dla całej rodziny.' },
  { value: 'eco', label: 'Eko', description: 'Zrównoważony design, materiały z certyfikatami.' },
  { value: 'energetic', label: 'Energetyczny', description: 'Żywe kolory, wakacyjna energia.' }
];

const channelOptions: { value: ChannelOption; label: string }[] = [
  { value: 'Facebook/Instagram', label: 'Facebook / Instagram' },
  { value: 'Google Ads', label: 'Google Ads' },
  { value: 'Pinterest', label: 'Pinterest' },
  { value: 'Newsletter', label: 'Newsletter' }
];

const ctaOptions: { value: AdInput['ctaStyle']; label: string }[] = [
  { value: 'pilne', label: 'Pilne (FOMO)' },
  { value: 'inspirujące', label: 'Inspirujące' },
  { value: 'doradzające', label: 'Doradzające' }
];

const campaignGoals: { value: AdInput['campaignGoal']; label: string }[] = [
  { value: 'sprzedaż', label: 'Natychmiastowa sprzedaż' },
  { value: 'lead generation', label: 'Pozyskiwanie leadów' },
  { value: 'budowanie świadomości', label: 'Budowanie świadomości' }
];

const defaultInput: AdInput = {
  brandName: 'GreenFrame Studio',
  productFocus: 'Zestawy mebli tarasowych z modrzewia',
  targetAudience: 'świadomi designu właściciele domów z ogrodem',
  keyBenefits: ['Odporność na warunki pogodowe', 'Projekt dopasowany na wymiar', '5-letnia gwarancja serwisowa'],
  tone: 'eco',
  campaignGoal: 'lead generation',
  channelEmphasis: ['Facebook/Instagram', 'Google Ads'],
  ctaStyle: 'inspirujące',
  seasonalAngle: 'Pierwsze ciepłe wieczory na tarasie'
};

export function AdGenerator() {
  const [form, setForm] = useState<AdInput>(defaultInput);
  const [livePreview, setLivePreview] = useState(true);

  const concept = useMemo<AdConcept>(() => generateAdConcept(form), [form]);

  const updateField = <K extends keyof AdInput>(key: K, value: AdInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...form.keyBenefits];
    updated[index] = value;
    updateField('keyBenefits', updated);
  };

  const addBenefit = () => {
    updateField('keyBenefits', [...form.keyBenefits, '']);
  };

  const removeBenefit = (index: number) => {
    updateField(
      'keyBenefits',
      form.keyBenefits.filter((_, i) => i !== index)
    );
  };

  const toggleChannel = (channel: ChannelOption) => {
    const exists = form.channelEmphasis.includes(channel);
    if (exists) {
      updateField(
        'channelEmphasis',
        form.channelEmphasis.filter((c) => c !== channel)
      );
    } else {
      updateField('channelEmphasis', [...form.channelEmphasis, channel]);
    }
  };

  const copySection = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:px-8">
      <section className="w-full rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-950/5 backdrop-blur">
        <header className="mb-6 space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
            Kreator kampanii
          </span>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Zaprojektuj reklamę mebli ogrodowych w kilka minut
          </h1>
          <p className="text-slate-600">
            Wprowadź informacje o marce, a agent dobierze wyróżniki, kanały i komunikaty dopasowane do klientów premium szukających autorskiej stolarki.
          </p>
        </header>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span>Podgląd na żywo</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={livePreview}
              onChange={(event) => setLivePreview(event.target.checked)}
            />
            <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-brand-500"></div>
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5 shadow"></div>
          </label>
        </div>

        <form className="mt-6 grid gap-6 text-sm text-slate-700">
          <div className="grid gap-2">
            <label className="font-semibold">Marka</label>
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              value={form.brandName}
              onChange={(event) => updateField('brandName', event.target.value)}
              placeholder="Nazwa marki"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Kluczowy produkt</label>
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              value={form.productFocus}
              onChange={(event) => updateField('productFocus', event.target.value)}
              placeholder="np. Zestaw mebli z drewna tekowego"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Idealny odbiorca</label>
            <textarea
              className="min-h-[80px] rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              value={form.targetAudience}
              onChange={(event) => updateField('targetAudience', event.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold">Kluczowe benefity</label>
              <button
                type="button"
                className="rounded-full border border-brand-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700"
                onClick={addBenefit}
              >
                Dodaj
              </button>
            </div>
            <div className="space-y-3">
              {form.keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    value={benefit}
                    onChange={(event) => handleBenefitChange(index, event.target.value)}
                    placeholder="np. Drewno z polskich tartaków"
                  />
                  {form.keyBenefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="rounded-full border border-slate-300 px-3 py-2 text-xs text-slate-500 hover:border-red-300 hover:text-red-500"
                    >
                      Usuń
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Ton komunikacji</label>
            <div className="grid gap-3 md:grid-cols-2">
              {toneOptions.map((tone) => {
                const selected = form.tone === tone.value;
                return (
                  <button
                    type="button"
                    key={tone.value}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      selected
                        ? 'border-brand-500 bg-brand-50 text-brand-800 shadow-inner'
                        : 'border-slate-200 hover:border-brand-300 hover:bg-brand-50/40'
                    }`}
                    onClick={() => updateField('tone', tone.value)}
                  >
                    <div className="font-semibold">{tone.label}</div>
                    <p className="mt-1 text-xs text-slate-600">{tone.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Cel kampanii</label>
            <select
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              value={form.campaignGoal}
              onChange={(event) => updateField('campaignGoal', event.target.value as AdInput['campaignGoal'])}
            >
              {campaignGoals.map((goal) => (
                <option key={goal.value} value={goal.value}>
                  {goal.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Kanały priorytetowe</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {channelOptions.map((channel) => {
                const selected = form.channelEmphasis.includes(channel.value);
                return (
                  <label
                    key={channel.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                      selected ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 hover:border-brand-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      checked={selected}
                      onChange={() => toggleChannel(channel.value)}
                    />
                    {channel.label}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">CTA</label>
            <div className="flex flex-wrap gap-2">
              {ctaOptions.map((cta) => {
                const selected = form.ctaStyle === cta.value;
                return (
                  <button
                    key={cta.value}
                    type="button"
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      selected ? 'border-brand-500 bg-brand-500 text-white shadow' : 'border-slate-200 text-slate-600 hover:border-brand-300'
                    }`}
                    onClick={() => updateField('ctaStyle', cta.value)}
                  >
                    {cta.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="font-semibold">Sezonowy motyw / insight</label>
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              value={form.seasonalAngle ?? ''}
              onChange={(event) => updateField('seasonalAngle', event.target.value)}
              placeholder="np. Wiosenny start sezonu grillowego"
            />
          </div>
        </form>
      </section>

      <aside className="sticky top-6 h-fit w-full shrink-0 rounded-3xl bg-slate-900 text-slate-100 shadow-2xl md:max-w-md">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-white">Scenariusz kampanii</h2>
          <button
            type="button"
            className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-wide text-white/80 hover:border-white hover:text-white"
            onClick={() => copySection(formatConcept(concept))}
          >
            Kopiuj wszystko
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <OutputBlock
            title="Nagłówek"
            content={concept.headline}
            onCopy={() => copySection(concept.headline)}
            live={livePreview}
          />
          <OutputBlock
            title="Tekst główny"
            content={concept.primaryText}
            onCopy={() => copySection(concept.primaryText)}
            live={livePreview}
          />
          <OutputBlock
            title="Punkty wsparcia"
            content={concept.supportPoints.map((point) => `• ${point}`).join('\n')}
            onCopy={() => copySection(concept.supportPoints.join('\n'))}
            live={livePreview}
          />
          <OutputBlock
            title="Social snippets"
            content={concept.socialSnippets.map((snippet) => `• ${snippet}`).join('\n\n')}
            onCopy={() => copySection(concept.socialSnippets.join('\n'))}
            live={livePreview}
          />
          <OutputBlock
            title="Google Ads"
            content={concept.googleHeadlines.map((headline) => `• ${headline}`).join('\n')}
            onCopy={() => copySection(concept.googleHeadlines.join('\n'))}
            live={livePreview}
          />
          <OutputBlock
            title="Słowa kluczowe"
            content={concept.keywords.join(', ')}
            onCopy={() => copySection(concept.keywords.join(', '))}
            live={livePreview}
          />
          <OutputBlock
            title="Kierunek wizualny"
            content={`${concept.visualDirection.imagery}\nPaleta: ${concept.visualDirection.palette.join(', ')}`}
            onCopy={() => copySection(`${concept.visualDirection.imagery}\nPaleta: ${concept.visualDirection.palette.join(', ')}`)}
            live={livePreview}
          />
          <OutputBlock
            title="CTA"
            content={concept.cta}
            onCopy={() => copySection(concept.cta)}
            live={livePreview}
          />
          <OutputBlock
            title="Hook kanałowy"
            content={concept.campaignHook}
            onCopy={() => copySection(concept.campaignHook)}
            live={livePreview}
          />
        </div>
      </aside>
    </div>
  );
}

function formatConcept(concept: AdConcept) {
  return [
    `Nagłówek: ${concept.headline}`,
    '',
    `Tekst główny:`,
    concept.primaryText,
    '',
    'Punkty wsparcia:',
    ...concept.supportPoints.map((point) => `- ${point}`),
    '',
    'Social:',
    ...concept.socialSnippets.map((snippet) => `- ${snippet}`),
    '',
    'Google Ads:',
    ...concept.googleHeadlines.map((headline) => `- ${headline}`),
    '',
    `Słowa kluczowe: ${concept.keywords.join(', ')}`,
    '',
    `CTA: ${concept.cta}`,
    '',
    `Kierunek wizualny: ${concept.visualDirection.imagery}`,
    `Paleta: ${concept.visualDirection.palette.join(', ')}`,
    '',
    'Kanały:',
    concept.campaignHook
  ].join('\n');
}

interface OutputBlockProps {
  title: string;
  content: string;
  live: boolean;
  onCopy: () => void;
}

function OutputBlock({ title, content, live, onCopy }: OutputBlockProps) {
  return (
    <article className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">{title}</h3>
        <button
          type="button"
          className="rounded-full border border-white/20 px-2 py-1 text-[11px] uppercase tracking-wide text-white/70 hover:border-white/60 hover:text-white"
          onClick={onCopy}
        >
          Kopiuj
        </button>
      </div>
      <p
        className={`whitespace-pre-wrap text-sm leading-relaxed text-white/90 transition ${
          live ? 'opacity-100' : 'opacity-60'
        }`}
      >
        {content}
      </p>
    </article>
  );
}
