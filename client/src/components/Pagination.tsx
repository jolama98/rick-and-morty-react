import { AppState } from "../AppState";
import { characterService } from "../services/CharecterService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default function Pagination() {

  async function changePage(pageNumber: number) {
    try {
      AppState.characterQuery
        ? await characterService.changeSearchPage(AppState.currentPage + pageNumber, AppState.characterQuery)
        : await characterService.changePage(AppState.currentPage + pageNumber)
      logger.log('Page navigation', pageNumber)
      AppState.currentPage = pageNumber

    }
    catch (error) {
      Pop.error(error as Error, "BOOBIES");
    }

  }

  return (
    <div className='d-flex align-items-center justify-content-between'>
      <button className='btn' disabled={AppState.currentPage == 1} onClick={() => changePage(-1)}>Previous</button>
      <span>page {AppState.currentPage} of {AppState.totalPages}</span>
      <button className='btn' disabled={AppState.currentPage == AppState.totalPages} onClick={() => changePage(+1)}>Next</button>
    </div>
  )
}
