import { Project } from '@/src/models/ApiModels'
import React, { useCallback } from 'react'
import SecurityBadge from './SecurityBadge'


interface Props {
  project: Project
  showFalseAlso?: boolean // discriminates between behaviour in ProjectCard and Banner
}

const hints = [
  "Project founder(s)/manager(s) are publicly doxxed",
  "Project funds are handled using a multisig wallet",
  "The project is verified on a marketplace or DEX"
]

export default function SecurityBadgeCollection({ project, showFalseAlso = false }: Props) {

  const { project_doxx, project_verified, project_multisig } = project

  // const shouldShowBadge = useCallback(
  //   (property: boolean | undefined | null) => {
  //     if (showFalseAlso) {
  //       return property !== undefined
  //     }
  //     return property === true && property !== undefined
  //   },
  //   [showFalseAlso],
  // )

  const shouldShowBadge = (property: boolean | undefined | null) => {
    if (showFalseAlso) {
      return property !== undefined
    }
    return property === true && property !== undefined
  }

  return (
    <div className="card-actions">
      {shouldShowBadge(project_doxx) && project_doxx !== undefined &&
        <SecurityBadge status={project_doxx} hint={hints[0]}>
          DOXX
        </SecurityBadge>
      }
      {shouldShowBadge(project_verified) && project_verified !== undefined &&
        <SecurityBadge status={project_verified} hint={hints[2]}>
          VERIFIED
        </SecurityBadge>
      }
      {shouldShowBadge(project_multisig) && project_multisig !== undefined &&
        <SecurityBadge status={project_multisig} hint={hints[1]}>
          MULTISIG
        </SecurityBadge>
      }
    </div>
  )
}
