import useSupabase from "src/boot/supabase";
import useAuthUser from "./UseAuthUser";
import { v4 as uuidv4 } from "uuid";

export default function useApi() {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  };
  const listPrive = async (table, userId) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("user_id", userId)
      .order("name");
    if (error) throw error;
    return data;
  };

  const filter = async (table, filter) => {
    const { data, error } = await supabase.from(table).select(filter);
    if (error) throw error;
    return data;
  };

  const getNumberRows = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .eq("id", id);
    if (error) throw error;
    return data;
  };
  // c'est mieux d'utiliser une seule fonction , en l'occurence la suivant et pas getNumberRows
  const countrow = async (table, col, id) => {
    const { data, error, count } = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .eq(col, id);

    return count;
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data[0];
  };

  const getByColKeyAndKeyWord = async (table, col, keyWord) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .filter(col, "eq", keyWord)
      .order("name");

    if (error) throw error;
    return data;
  };

  const listPublic = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  };
  const listProduits = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  };

  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  };
  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update([
        {
          ...form,
        },
      ])
      .match({ id: form.id });

    if (error) {
      console.log("erreur", error.value);
      throw error;
    }

    return data;
  };
  const update_2 = async (table, itemid, val) => {
    const { data, error } = await supabase
      .from(table)
      .update({ like: val })
      .match({ id: itemid });
    if (error) throw error;

    return data;
  };

  const increment = async (x, id, tabname) => {
    const { data, error } = await supabase.rpc("increment", {
      tab: tabname,
      x,
      row_id: id,
    });
    return data;
  };

  const list_with_liked = async (x) => {
    const { data, error } = await supabase.rpc("list_final", {
      f_userid: x,
    });

    if (error) throw error;
    return data;
  };

  const list_with_liked_filtered = async (x, y) => {
    const { data, error } = await supabase.rpc("list_final_filtered", {
      f_userid: x,
      prod_id: y,
    });

    if (error) throw error;
    return data;
  };

  const sendlike = async (tabnameinput, tabnameinpout, id) => {
    const { data, error } = await supabase.rpc("sendlike", {
      tableinput: tabnameinput,
      tableoutput: tabnameinpout,
      prodid: id,
    });
    if (error) throw error;

    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error) throw error;

    return data, error;
  };

  const removemagasin = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error && error.code != 23503) {
      throw error;
    }
    if (error && error.code == 23503) {
      return true;
    }
  };

  const removelikes = async (table, prodid, userid) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ product_id: prodid, user_id: userid });
    if (error) throw error;
    return data;
  };

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4();
    const { error } = supabase.storage.from(storage).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    const publicUrl = await getUrlPublic(fileName, storage);
    if (error) throw error;
    return publicUrl;
  };

  const getUrlPublic = async (fileName, storage) => {
    const { publicURL, error } = supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    if (error) throw error;
    return publicURL;
  };

  //
  return {
    list,
    getById,
    post,
    update,
    remove,
    filter,
    uploadImg,
    listPublic,
    listPrive,
    getByColKeyAndKeyWord,
    getNumberRows,
    update_2,
    increment,
    countrow,
    sendlike,

    listProduits,
    list_with_liked,
    removelikes,
    list_with_liked_filtered,
    removemagasin,
  };
}
