<?php
class HTMLPage
{
    var $title;
    var $body;
    var $output;

    var $use_bootstrap = true;
    var $css_files = array();
    var $js_files = array();

    function __construct( $title = "" ) { $this->title = $title; }

    public function Add( $more ) { $this->body .= $more; }
    public function AddCSS( $src ) { $this->css_files[] = $src; }
    public function AddJavascript( $src ) { $this->js_files[] = $src; }
    public function AddBootstrap(){ $this->use_bootstrap = true; }

    public function AddSideBar()
    {
        $this->body .= '<div class="sidebar">
                        <div class="dashboard-title">
                        <h2>Steal My Meal</h2>
                        <h3>Dashboard</h3>
                        </div>
                        <ul class="unlist">
                        <li><a href="https://wdev.be/bartvdb/admin/index.php">Admin</a></li>
                        <li><a href="https://wdev.be/bartvdb/admin/lib/pages/users.php">Users</a>
                        <li><a href="https://wdev.be/bartvdb/admin/lib/pages/statistics.php">Statistics</a>
                        <li><a href="https://wdev.be/bartvdb/admin/lib/authentication/logout.php">Log-out</a>
                        </li>
                        </ul>
                        </div>';
    }

    public function AddModal($modal_title,$modal_id, $save_btn_class, $modal_body)
    {
        $this->body .= '<div class="modal fade" id="'.$modal_id.'" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">'.$modal_title.'</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">'.
                        $modal_body
                        .'</div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success '.$save_btn_class.'">Save</button>
                        </div>
                        </div>
                        </div>
                        </div>
        ';
    }


    //HTML pagina opbouwen en stockeren in $this->output
    public function Generate()
    {
        $this->output = "<!DOCTYPE html>";
        $this->output .= "<html lang='nl'>";
        $this->output .= '<head>';
        $this->output .= '<meta charset="UTF-8">';
        $this->output .= '<title>' . $this->title . '</title>';

        //use bootstrap?
        if ( $this->use_bootstrap )
        {
            $this->output .= '
            <!-- Latest compiled and minified CSS -->
            <link rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <!-- jQuery library -->
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <!-- Latest compiled JavaScript -->
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
        }

        //css files
        foreach($this->css_files as $css_file)
        {
            $this->output .= '<link rel="stylesheet" href="' . $css_file . '">';
        }

        $this->output .= '</head>';

        //body
        $this->output .= "<body>";
        $this->output .= $this->body ;

        //javascript files
        foreach( $this->js_files as $js_file)
        {
            $this->output .= '<script src="' . $js_file . '"></script>';
        }

        $this->output .= "</body>";
        $this->output .= "</html>";
    }
    public function __toString()
    {
        return $this->output;
    }
}