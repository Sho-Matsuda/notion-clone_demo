import { supabase } from "@/lib/supabase";

export const noteRepository = {
  async create(
    useId: string,
    params: { title?: string; parentID?: number; position?: number }
  ) {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: useId,
        title: params.title,
        parent_document: params.parentID,
      })
      .select()
      .single();
    if (error != null) throw new Error(error?.message);

    return data;
  },
  async find(userId: string, parentDocumentId: number) {
    const query = supabase
      .from("notes")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const { data } =
      parentDocumentId != null
        ? await query.eq("parent_document", parentDocumentId)
        : await query.is("parent_document", null);

    return data;
  },
  async findOne(userId: string, id: number) {
    const { data } = await supabase
      .from("notes")
      .select()
      .eq("user_id", userId)
      .eq("id", id)
      .single();

    return data;
  },
  async update(id: number, note: { title?: string; content?: string }) {
    const { data, error } = await supabase
      .from("notes")
      .update(note)
      .eq("id", id)
      .select()
      .single();

    if (error != null) throw new Error(error?.message);

    return data;
  },
  async findByKeyword(userId: string, keyword: string) {
    const { data } = await supabase
      .from("notes")
      .select()
      .eq("user_id", userId)
      .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
      .order("created_at", { ascending: false });
    return data;
  },
  async delete(id: number) {
    const { error } = await supabase.rpc("delete_children_notes_recursively", {
      note_id: id,
    });
    if (error != null) throw new Error(error?.message);
    return true;
  },
};
