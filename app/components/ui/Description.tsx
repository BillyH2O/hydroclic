import React from 'react'

type Props = {
  title: string
  description: string
  /** Titre + texte centrés (flex items-center) */
  centered?: boolean
}

export const Description = ({ title, description, centered = false }: Props) => {
  if (centered) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center gap-4">
        <h2 className="title">{title}</h2>
        <p className="text-md text-black/60 max-w-3xl">{description}</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-start sm:justify-between gap-4 sm:gap-6">
      <h2 className="title w-full sm:w-auto">{title}</h2>
      <p className="text-md text-left sm:text-right text-black/60 w-full sm:w-[40%]">
        {description}
      </p>
    </div>
  )
}