export interface Language {
  id?: string | null;
  name?: string | null;
  flag?: string | null;
}

export function LanguageFromPartial(
  input: Partial<{ id: string | null; name: string | null }>,
): Language {
  return {
    id: input.id || null,
    name: input.name || null,
    flag: '',
  };
}
