'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SectionHeading } from '@/components/section-heading'
import { ProgramCard } from '@/components/program-card'
import { useT } from '@/lib/i18n/locale-provider'
import { programs, industries } from '@/lib/mock-data'
import type { ProgramStatus, ProgramType } from '@/lib/types'

const programTypeCodes: Array<'all' | ProgramType> = [
  'all',
  'bug-bounty',
  'vdp',
  'private-preview',
]
const programStatusCodes: Array<'all' | ProgramStatus> = [
  'all',
  'active',
  'upcoming',
  'paused',
]
const sortOptions = [
  { value: 'newest', key: 'programs.sort.newest' },
  { value: 'rewards-high', key: 'programs.sort.rewardsHigh' },
  { value: 'rewards-low', key: 'programs.sort.rewardsLow' },
  { value: 'assets', key: 'programs.sort.assets' },
] as const

export default function ProgramsPage() {
  const t = useT()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPrograms = useMemo(() => {
    let result = [...programs]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.organization.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedIndustry !== 'all') {
      result = result.filter((p) => p.industry === selectedIndustry)
    }

    if (selectedType !== 'all') {
      result = result.filter((p) => p.type === (selectedType as ProgramType))
    }

    if (selectedStatus !== 'all') {
      result = result.filter(
        (p) => p.status === (selectedStatus as ProgramStatus),
      )
    }

    switch (sortBy) {
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime(),
        )
        break
      case 'rewards-high':
        result.sort((a, b) => b.rewardRange.max - a.rewardRange.max)
        break
      case 'rewards-low':
        result.sort((a, b) => a.rewardRange.min - b.rewardRange.min)
        break
      case 'assets':
        result.sort((a, b) => b.assetsCount - a.assetsCount)
        break
    }

    return result
  }, [searchQuery, selectedIndustry, selectedType, selectedStatus, sortBy])

  const activeFiltersCount = [
    selectedIndustry !== 'all',
    selectedType !== 'all',
    selectedStatus !== 'all',
  ].filter(Boolean).length

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedIndustry('all')
    setSelectedType('all')
    setSelectedStatus('all')
    setSortBy('newest')
  }

  const labelForType = (code: 'all' | ProgramType) =>
    code === 'all' ? t('programs.filter.allTypes') : t(`programType.${code}`)
  const labelForStatus = (code: 'all' | ProgramStatus) =>
    code === 'all'
      ? t('programs.filter.allStatuses')
      : t(`programStatus.${code}`)

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t('programs.title')}
          subtitle={t('programs.subtitle')}
          badge={t('programs.badge')}
        />

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('programs.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button
              variant="outline"
              className="sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {t('programs.filter.mobileToggle')}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden sm:flex items-center gap-2">
              <Select
                value={selectedIndustry}
                onValueChange={setSelectedIndustry}
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder={t('programs.filter.industry')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('programs.filter.allIndustries')}
                  </SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t('programs.filter.type')} />
                </SelectTrigger>
                <SelectContent>
                  {programTypeCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {labelForType(code)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={t('programs.filter.status')} />
                </SelectTrigger>
                <SelectContent>
                  {programStatusCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {labelForStatus(code)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder={t('programs.filter.sort')} />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden grid grid-cols-2 gap-3 p-4 rounded-lg border border-border bg-card"
            >
              <Select
                value={selectedIndustry}
                onValueChange={setSelectedIndustry}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('programs.filter.industry')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('programs.filter.allIndustries')}
                  </SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('programs.filter.type')} />
                </SelectTrigger>
                <SelectContent>
                  {programTypeCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {labelForType(code)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder={t('programs.filter.status')} />
                </SelectTrigger>
                <SelectContent>
                  {programStatusCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {labelForStatus(code)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={t('programs.filter.sort')} />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Active Filters */}
          {(activeFiltersCount > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {t('programs.activeFilters')}
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  {t('programs.searchTag', { q: searchQuery })}
                  <button onClick={() => setSearchQuery('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedIndustry !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedIndustry}
                  <button onClick={() => setSelectedIndustry('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {labelForType(selectedType as ProgramType)}
                  <button onClick={() => setSelectedType('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedStatus !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {labelForStatus(selectedStatus as ProgramStatus)}
                  <button onClick={() => setSelectedStatus('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                {t('programs.clearAll')}
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t(
              filteredPrograms.length === 1
                ? 'programs.results.one'
                : 'programs.results.other',
              { count: filteredPrograms.length },
            )}
          </p>
          <Badge variant="outline" className="text-xs">
            {t('common.demoData')}
          </Badge>
        </div>

        {/* Programs Grid/List */}
        {filteredPrograms.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredPrograms.map((program, index) => (
              <ProgramCard
                key={program.id}
                program={program}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('programs.empty.title')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('programs.empty.body')}
            </p>
            <Button variant="outline" onClick={clearFilters}>
              {t('programs.empty.clear')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
