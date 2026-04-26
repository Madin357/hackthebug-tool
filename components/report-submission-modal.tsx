'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Upload, Info, FileText, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { weaknessCategories } from '@/lib/mock-data'
import { useT } from '@/lib/i18n/locale-provider'
import { cn } from '@/lib/utils'

interface ReportSubmissionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programName: string
  programAssets: string[]
}

const severityCodes = ['critical', 'high', 'medium', 'low', 'informational'] as const
const stepIds = [1, 2, 3] as const

export function ReportSubmissionModal({
  open,
  onOpenChange,
  programName,
  programAssets,
}: ReportSubmissionModalProps) {
  const t = useT()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    asset: '',
    severity: '',
    weaknessType: '',
    summary: '',
    stepsToReproduce: '',
    proofOfConcept: '',
    impact: '',
    remediation: '',
    cvssScore: '',
    agreeToRules: false,
  })

  const [attachments, setAttachments] = useState<string[]>([])

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setIsSubmitted(false)
    setFormData({
      title: '',
      asset: '',
      severity: '',
      weaknessType: '',
      summary: '',
      stepsToReproduce: '',
      proofOfConcept: '',
      impact: '',
      remediation: '',
      cvssScore: '',
      agreeToRules: false,
    })
    setAttachments([])
    onOpenChange(false)
  }

  const canProceedStep1 =
    formData.title && formData.asset && formData.severity && formData.weaknessType
  const canProceedStep2 = formData.summary && formData.stepsToReproduce
  const canSubmit = canProceedStep2 && formData.impact && formData.agreeToRules

  const stepMeta = stepIds.map((id) => ({
    id,
    title: t(
      id === 1
        ? 'report.steps.basic.title'
        : id === 2
          ? 'report.steps.tech.title'
          : 'report.steps.impact.title',
    ),
  }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden p-0 gap-0 flex flex-col">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-8 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t('report.success.title')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t('report.success.body')}
            </p>
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 max-w-sm mx-auto">
              <p className="text-sm text-muted-foreground">
                {t('report.success.idLabel')}
              </p>
              <p className="font-mono text-foreground">
                HTB-2026-
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            <Badge variant="outline" className="mb-6">
              {t('common.hackathonDemo')}
            </Badge>
            <div>
              <Button onClick={handleClose}>{t('common.close')}</Button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <DialogHeader className="px-5 sm:px-6 pt-5 pb-3 pr-12 border-b border-border space-y-1">
              <DialogTitle className="text-lg sm:text-xl text-left">
                {t('report.title')}
              </DialogTitle>
              <DialogDescription className="text-left">
                {t('report.description', { program: programName })}
              </DialogDescription>
            </DialogHeader>

            {/* Compact stepper */}
            <div className="px-5 sm:px-6 py-3 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-1 sm:gap-2">
                {stepMeta.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0"
                  >
                    <div
                      className={cn(
                        'h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors shrink-0',
                        currentStep === step.id
                          ? 'bg-primary text-primary-foreground'
                          : currentStep > step.id
                            ? 'bg-success text-success-foreground'
                            : 'bg-secondary text-muted-foreground',
                      )}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <p
                      className={cn(
                        'text-xs font-medium truncate hidden sm:block',
                        currentStep === step.id
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {step.title}
                    </p>
                    {index < stepMeta.length - 1 && (
                      <div
                        className={cn(
                          'h-0.5 flex-1 min-w-[12px] mx-1',
                          currentStep > step.id ? 'bg-success' : 'bg-border',
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable form body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 min-h-0">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        {t('report.fields.title')} *
                      </Label>
                      <Input
                        id="title"
                        placeholder={t('report.fields.title.placeholder')}
                        value={formData.title}
                        onChange={(e) =>
                          updateFormData('title', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="asset">
                        {t('report.fields.asset')} *
                      </Label>
                      <Select
                        value={formData.asset}
                        onValueChange={(value) =>
                          updateFormData('asset', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('report.fields.asset.placeholder')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {programAssets.map((asset) => (
                            <SelectItem key={asset} value={asset}>
                              {asset}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('report.fields.severity')} *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {severityCodes.map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => updateFormData('severity', code)}
                            className={cn(
                              'p-3 rounded-lg border text-left transition-colors',
                              formData.severity === code
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50',
                            )}
                          >
                            <p className="font-medium text-foreground text-sm">
                              {t(`report.severity.${code}.label`)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t(`report.severity.${code}.desc`)}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weakness">
                        {t('report.fields.weakness')} *
                      </Label>
                      <Select
                        value={formData.weaknessType}
                        onValueChange={(value) =>
                          updateFormData('weaknessType', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              'report.fields.weakness.placeholder',
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {weaknessCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="summary">
                        {t('report.fields.summary')} *
                      </Label>
                      <Textarea
                        id="summary"
                        placeholder={t('report.fields.summary.placeholder')}
                        rows={3}
                        value={formData.summary}
                        onChange={(e) =>
                          updateFormData('summary', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="steps">
                        {t('report.fields.steps')} *
                      </Label>
                      <Textarea
                        id="steps"
                        placeholder={t('report.fields.steps.placeholder')}
                        rows={5}
                        value={formData.stepsToReproduce}
                        onChange={(e) =>
                          updateFormData('stepsToReproduce', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poc">{t('report.fields.poc')}</Label>
                      <Textarea
                        id="poc"
                        placeholder={t('report.fields.poc.placeholder')}
                        rows={4}
                        className="font-mono text-sm"
                        value={formData.proofOfConcept}
                        onChange={(e) =>
                          updateFormData('proofOfConcept', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t('report.fields.attachments')}</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-5 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="h-7 w-7 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {t('report.fields.attachments.dropzone')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('report.fields.attachments.types')}
                        </p>
                        <p className="text-xs text-primary mt-2">
                          {t('report.fields.attachments.demo')}
                        </p>
                      </div>
                      {attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {attachments.map((file, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="gap-1"
                            >
                              {file}
                              <button
                                onClick={() =>
                                  setAttachments(
                                    attachments.filter((_, i) => i !== index),
                                  )
                                }
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="impact">
                        {t('report.fields.impact')} *
                      </Label>
                      <Textarea
                        id="impact"
                        placeholder={t('report.fields.impact.placeholder')}
                        rows={4}
                        value={formData.impact}
                        onChange={(e) =>
                          updateFormData('impact', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remediation">
                        {t('report.fields.remediation')}
                      </Label>
                      <Textarea
                        id="remediation"
                        placeholder={t(
                          'report.fields.remediation.placeholder',
                        )}
                        rows={3}
                        value={formData.remediation}
                        onChange={(e) =>
                          updateFormData('remediation', e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvss">{t('report.fields.cvss')}</Label>
                      <Input
                        id="cvss"
                        placeholder={t('report.fields.cvss.placeholder')}
                        value={formData.cvssScore}
                        onChange={(e) =>
                          updateFormData('cvssScore', e.target.value)
                        }
                        className="max-w-32"
                      />
                    </div>

                    {/* Summary Preview */}
                    <div className="rounded-lg border border-border bg-secondary/30 p-4">
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {t('report.summary.title')}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            {t('report.summary.titleField')}
                          </p>
                          <p className="text-foreground">
                            {formData.title || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {t('report.summary.assetField')}
                          </p>
                          <p className="text-foreground">
                            {formData.asset || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {t('report.summary.severityField')}
                          </p>
                          <p className="text-foreground">
                            {formData.severity
                              ? t(`severity.${formData.severity}`)
                              : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {t('report.summary.weaknessField')}
                          </p>
                          <p className="text-foreground">
                            {formData.weaknessType || '-'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Agreement */}
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                      <Checkbox
                        id="agree"
                        checked={formData.agreeToRules}
                        onCheckedChange={(checked) =>
                          updateFormData('agreeToRules', checked as boolean)
                        }
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="agree"
                          className="text-sm font-medium cursor-pointer"
                        >
                          {t('report.agree.label')} *
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {t('report.agree.body')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
                      <Info className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        {t('report.demo.notice')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky footer */}
            <div className="px-5 sm:px-6 py-3 border-t border-border flex items-center justify-between gap-2 bg-background">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                {t('common.previous')}
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  {t('common.cancel')}
                </Button>
                {currentStep < 3 ? (
                  <Button
                    size="sm"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={
                      (currentStep === 1 && !canProceedStep1) ||
                      (currentStep === 2 && !canProceedStep2)
                    }
                  >
                    {t('common.next')}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting
                      ? t('report.actions.submitting')
                      : t('report.actions.submit')}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
