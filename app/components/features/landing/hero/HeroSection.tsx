"use client"

import Button from '../../../ui/MainButton'


interface HeroSectionProps {
  backgroundImage: string;
  darkEffect?: boolean;
  title: string;
  description: string;
  button1Label: string;
  button2Label: string;
  id: string;
  id2?: string | null;
}

const HeroSection = ({ 
  backgroundImage, 
  darkEffect = false,
  title, 
  description, 
  button1Label, 
  button2Label,
  id,
  id2 = "/"
}: HeroSectionProps) => {
  return (
    <section 
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      
      {darkEffect && <div className="absolute inset-0 bg-black/30 z-10" />}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl min-h-screen flex-col items-center justify-center gap-16 px-4 py-24 text-white sm:px-6 lg:px-8">
          <h1 className="w-full max-w-5xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl">
            {title}
          </h1>
          <p className="w-full max-w-4xl text-center text-lg font-medium md:text-2xl 2xl:text-3xl">{description}</p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Button label={button1Label} size='sm' variant='primary' href={`${id}`} blur={true} />
              <Button label={button2Label} size='sm' variant='neutral' href={`${id2}`} blur={true} />
          </div>
      </div>
    </section>
  )
}

export default HeroSection