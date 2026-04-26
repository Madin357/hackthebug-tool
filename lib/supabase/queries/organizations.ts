import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/database.types'
import type { Organization } from '@/lib/types'
import { mapOrganization } from '@/lib/supabase/mappers'

type Client = SupabaseClient<Database>

export async function listOrganizations(
  client: Client,
): Promise<Organization[]> {
  const { data, error } = await client
    .from('organizations')
    .select('*')
    .order('name')

  if (error) throw error
  return (data ?? []).map(mapOrganization)
}

export async function getOrganizationById(
  client: Client,
  id: string,
): Promise<Organization | null> {
  const { data, error } = await client
    .from('organizations')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data ? mapOrganization(data) : null
}

export interface CreateOrganizationInput {
  slug: string
  name: string
  industry: string
  description?: string | null
}

export async function createOrganization(
  client: Client,
  input: CreateOrganizationInput,
): Promise<Organization> {
  const { data, error } = await client
    .from('organizations')
    .insert({
      slug: input.slug,
      name: input.name,
      industry: input.industry,
      description: input.description ?? null,
    })
    .select('*')
    .single()

  if (error) throw error
  return mapOrganization(data)
}
