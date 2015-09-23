class ImagesController < ApplicationController

  def index
  end


  def show
=begin
    @image = Image.first
    @tags = @image.tags
    @player = Player.new

    respond_to do |format|
      format.json { render :json => @tags, :status => 200 }
    end
=end
  end

end
