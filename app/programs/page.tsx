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
import { programs, industries } from '@/lib/mock-data'
import type { ProgramStatus, ProgramType } from '@/lib/types'

const programTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'bug-bounty', label: 'Bug Bounty' },
  { value: 'vdp', label: 'VDP' },
  { value: 'private-preview', label: 'Private Preview' },
]

const programStatuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'paused', label: 'Paused' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'rewards-high', label: 'Highest Rewards' },
  { value: 'rewards-low', label: 'Lowest Rewards' },
  { value: 'assets', label: 'Most Assets' },
]

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPrograms = useMemo(() => {
    let result = [...programs]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.organization.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    }

    // Industry filter
    if (selectedIndustry !== 'all') {
      result = result.filter((p) => p.industry === selectedIndustry)
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter((p) => p.type === (selectedType as ProgramType))
    }

    // Status filter
    if (selectedStatus !== 'all') {
      result = result.filter((p) => p.status === (selectedStatus as ProgramStatus))
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
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

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          title="Bug Bounty Programs"
          subtitle="Explore active programs from organizations across Azerbaijan and the region. Find your next target and start hunting."
          badge="Programs Directory"
        />

        {/* Search and Filters Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs, organizations, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="sm:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden sm:flex items-center gap-2">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {programTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {programStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground'
                  }`}
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
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {programTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {programStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Active Filters */}
          {(activeFiltersCount > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
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
                  {programTypes.find((t) => t.value === selectedType)?.label}
                  <button onClick={() => setSelectedType('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedStatus !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {programStatuses.find((s) => s.value === selectedStatus)?.label}
                  <button onClick={() => setSelectedStatus('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredPrograms.length}</span>{' '}
            {filteredPrograms.length === 1 ? 'program' : 'programs'}
          </p>
          <Badge variant="outline" className="text-xs">
            Demo Data
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
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No programs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
