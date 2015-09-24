class ImagesController < ApplicationController

  def index
  end


  def show
    @image = Image.find(params[:id])

    image_data = @image.to_json(:include => [:characters, :tags])

    respond_to do |format|
      format.html { render :show }
      format.json { render :json => image_data, :status => 200 }
    end
  end

end
