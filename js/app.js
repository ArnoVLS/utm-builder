const supabaseUrl = 'https://hnsbjmomaynwsfmoelun.supabase.co';
const supabaseKey = 'sb_secret_TBDj_1r6raa1yLBWofw2ow_YMovLAoN';

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function test() {

  const { data, error } = await supabaseClient
    .from('sources')
    .select('*');

  console.log(data);

}

test();
