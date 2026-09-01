async function test() {

  const { data, error } = await supabaseClient
    .from('sources')
    .select('*');

  console.log(data);

}

test();
