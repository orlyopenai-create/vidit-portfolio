import { BeyondWorkAnimations } from '@/components/beyondwork/BeyondWorkAnimations'

const storyOfMyLife = `In 2019, while still a student, I co-founded Story of My Life — a live storytelling event featuring entrepreneurs, activists, and public figures sharing personal turning points. Across 5 editions, we hosted 32 speakers, drew 500+ attendees, and accumulated ~600K YouTube views. It was my first taste of building something from zero — and the first time I realised that the most compelling stories are almost never the ones that begin with success.`

const interests = 'Badminton · Vipassana Meditation · Formula 1 · Bachata · Techno & House Music · Travel (30+ countries) · Board Games'

export function BeyondWorkSection() {
  return (
    <section id="beyond-work" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <BeyondWorkAnimations storyOfMyLife={storyOfMyLife} interests={interests} />
      </div>
    </section>
  )
}
