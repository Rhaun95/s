import React from 'react';
import '../css/AdminGraph.css';

function AdminGraph() {
  return (
    <div>
      <section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <div className="row mb-4 ">

                {/* 막대 진행바 */}  {/* 매출 백분위 */} 
                  <div className="col-xl-6 col-12">
                    <div className="p-4 rounded">
                      <h4 className="mb-4" style={{textAlign: 'center'}}>매장별 매출</h4>

                      {/* 영화관1 */}
                      <h6 className='mb-2'>영화관 1</h6>                      
                      <div className="progress mb-4" style={{height: "20px"}}>
                        <div className="progress-bar progress-bar-striped font-weight-bold" style={{width: "91%"}}>91%</div>
                      </div>

                      {/* 영화관2 */}
                      <h6 className='mb-2'>영화관 2</h6>
                      <div className="progress mb-4" style={{height: "20px"}}>
                        <div className="progress-bar progress-bar-striped font-weight-bold bg-success" style={{width: "51%"}}>51%</div>
                      </div>

                      {/* 영화관3 */}
                      <h6 className='mb-2'>영화관 3</h6>
                      <div className="progress mb-4" style={{height: "20px"}}>
                        <div className="progress-bar progress-bar-striped font-weight-bold bg-danger" style={{width: "30%"}}>31%</div>
                      </div>

                      {/* 영화관4 */}
                      <h6 className='mb-2'>영화관 4</h6>
                      <div className="progress mb-4" style={{height: "20px"}}>
                        <div className="progress-bar progress-bar-striped font-weight-bold bg-info" style={{width: "55%"}}>55%</div>
                      </div>

                      {/* 영화관5 */}
                      <h6 className='mb-2'>영화관 5</h6>
                      <div className="progress mb-4" style={{height: "20px"}}>
                        <div className="progress-bar progress-bar-striped font-weight-bold" style={{width: "45%"}}>45%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>     
          </div>
        </section>
    </div>
  );
}

export default AdminGraph;