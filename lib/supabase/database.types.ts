/**
 * Hand-written TypeScript shape of the Supabase database. Mirrors the SQL
 * schema in DATABASE_PLAN.md / the Supabase SQL Editor seed.
 *
 * If you regenerate types via `npx supabase gen types typescript`, replace
 * the body of this file with the generated output. The hand version below
 * keeps us off the Supabase CLI for the hackathon.
 */

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          slug: string
          name: string
          industry: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          industry: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['organizations']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          email: string
          demo_password: string | null
          role: 'researcher' | 'organization' | 'admin'
          display_name: string
          handle: string | null
          country: string
          country_code: string
          organization_id: string | null
          avatar_url: string | null
          points: number
          reputation: number
          reports_accepted: number
          reports_submitted: number
          total_rewards: number
          sima_verified_at: string | null
          joined_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          demo_password?: string | null
          role: 'researcher' | 'organization' | 'admin'
          display_name: string
          handle?: string | null
          country?: string
          country_code?: string
          organization_id?: string | null
          avatar_url?: string | null
          points?: number
          reputation?: number
          reports_accepted?: number
          reports_submitted?: number
          total_rewards?: number
          sima_verified_at?: string | null
          joined_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      programs: {
        Row: {
          id: string
          organization_id: string
          slug: string
          name: string
          description: string
          long_description: string | null
          industry: string
          status: 'active' | 'upcoming' | 'paused' | 'closed'
          program_type: 'bug-bounty' | 'vdp' | 'private-preview'
          reward_min: number
          reward_max: number
          assets_count: number
          featured: boolean
          authorization_notice: string
          response_first: string | null
          response_triage: string | null
          response_resolution: string | null
          tags: string[]
          rules: string[]
          last_updated: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          slug: string
          name: string
          description: string
          long_description?: string | null
          industry: string
          status?: 'active' | 'upcoming' | 'paused' | 'closed'
          program_type?: 'bug-bounty' | 'vdp' | 'private-preview'
          reward_min?: number
          reward_max?: number
          assets_count?: number
          featured?: boolean
          authorization_notice?: string
          response_first?: string | null
          response_triage?: string | null
          response_resolution?: string | null
          tags?: string[]
          rules?: string[]
          last_updated?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['programs']['Insert']>
      }
      program_scopes: {
        Row: {
          id: string
          program_id: string
          in_scope: boolean
          target: string
          asset_type: 'web' | 'api' | 'mobile' | 'cloud' | 'network' | 'other' | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          program_id: string
          in_scope?: boolean
          target: string
          asset_type?: 'web' | 'api' | 'mobile' | 'cloud' | 'network' | 'other' | null
          description?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['program_scopes']['Insert']>
      }
      program_rewards: {
        Row: {
          id: string
          program_id: string
          severity: 'informational' | 'low' | 'medium' | 'high' | 'critical'
          min_reward: number
          max_reward: number
          sla: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          program_id: string
          severity: 'informational' | 'low' | 'medium' | 'high' | 'critical'
          min_reward?: number
          max_reward?: number
          sla?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['program_rewards']['Insert']>
      }
      reports: {
        Row: {
          id: string
          program_id: string
          researcher_id: string | null
          title: string
          severity: 'informational' | 'low' | 'medium' | 'high' | 'critical'
          status:
            | 'draft'
            | 'pending'
            | 'triaged'
            | 'resolved'
            | 'rewarded'
            | 'duplicate'
            | 'invalid'
          weakness_type: string | null
          asset: string | null
          summary: string | null
          steps_to_reproduce: string | null
          proof_of_concept: string | null
          impact: string | null
          remediation: string | null
          cvss_score: number | null
          reward_amount: number | null
          submitted_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          program_id: string
          researcher_id?: string | null
          title: string
          severity: 'informational' | 'low' | 'medium' | 'high' | 'critical'
          status?:
            | 'draft'
            | 'pending'
            | 'triaged'
            | 'resolved'
            | 'rewarded'
            | 'duplicate'
            | 'invalid'
          weakness_type?: string | null
          asset?: string | null
          summary?: string | null
          steps_to_reproduce?: string | null
          proof_of_concept?: string | null
          impact?: string | null
          remediation?: string | null
          cvss_score?: number | null
          reward_amount?: number | null
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['reports']['Insert']>
      }
      report_timeline_events: {
        Row: {
          id: string
          report_id: string
          actor_id: string | null
          event_type:
            | 'submitted'
            | 'triaged'
            | 'status_changed'
            | 'commented'
            | 'rewarded'
            | 'resolved'
            | 'closed'
            | 'duplicate'
            | 'invalid'
          from_status: string | null
          to_status: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          actor_id?: string | null
          event_type:
            | 'submitted'
            | 'triaged'
            | 'status_changed'
            | 'commented'
            | 'rewarded'
            | 'resolved'
            | 'closed'
            | 'duplicate'
            | 'invalid'
          from_status?: string | null
          to_status?: string | null
          message?: string | null
          created_at?: string
        }
        Update: Partial<
          Database['public']['Tables']['report_timeline_events']['Insert']
        >
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Convenience aliases
export type OrganizationRow = Database['public']['Tables']['organizations']['Row']
export type ProfileRow = Database['public']['Tables']['profiles']['Row']
export type ProgramRow = Database['public']['Tables']['programs']['Row']
export type ProgramScopeRow = Database['public']['Tables']['program_scopes']['Row']
export type ProgramRewardRow = Database['public']['Tables']['program_rewards']['Row']
export type ReportRow = Database['public']['Tables']['reports']['Row']
export type ReportTimelineEventRow =
  Database['public']['Tables']['report_timeline_events']['Row']
