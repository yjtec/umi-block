export function pageHandle(meta){
  const {current_page,total,per_page} = meta;
  return {
    page:parseInt(current_page),
    current:parseInt(current_page),
    total:parseInt(total),
    pageSize:parseInt(per_page)
  }
}